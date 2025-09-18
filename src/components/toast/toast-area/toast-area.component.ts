import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastComponent } from "../toast-message/toast.component";
import { animate, query, style, transition, trigger } from '@angular/animations';
import { NgComponentOutlet } from '@angular/common';
import { ToastStoreService } from '../../../services/toast/toast-store.service';
import { ToastConfig, ToastRendererDef } from '../../../types/toast/toast-config.types';
import { TOAST_INJECTION_TOKEN } from '../../../tokens/toast.token';
import { UntypedToast } from '../../../types/toast/toast.types';

@Component({
  selector: 'app-toast-area',
  standalone: true,
  imports: [ ToastComponent, NgComponentOutlet ],
  templateUrl: './toast-area.component.html',
  styleUrl: './toast-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('stack', [
      transition(':increment', [
        query('.toast-item:last-child', [
          style({ transform: 'translateX(120%)', opacity: 0 }),
          animate('220ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ], { optional: true })
      ]),
      transition(':decrement', [
        query('.toast-item:leave', [
          style({ height: '*', margin: '*', padding: '*', opacity: 1 }),
          animate('150ms ease-out', style({
            opacity: 0,
            height: 0,
            margin: 0,
            padding: 0
          }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ToastAreaComponent {
  private _toastStoreService: ToastStoreService = inject(ToastStoreService);

  // eslint-disable-next-line @tseslint/no-explicit-any
  private _toastConfig: ToastConfig<any> = inject(TOAST_INJECTION_TOKEN);

  protected toasts: Signal<UntypedToast[] | undefined> = toSignal(this._toastStoreService.toasts$);

  // eslint-disable-next-line @tseslint/no-explicit-any
  protected getMatchingComponent (kind: string): any {
    return this._toastConfig.renderers[ kind ]?.component;
  }

  // eslint-disable-next-line @tseslint/no-explicit-any
  protected getMatchingInputs (kind: string, toast: UntypedToast): any {
    // eslint-disable-next-line @tseslint/no-explicit-any
    const rendererDef: ToastRendererDef<any, string> | undefined = this._toastConfig.renderers[ kind ];

    if (!rendererDef?.mapInputs) return undefined;

    return rendererDef.mapInputs(toast.payload);
  }
}
