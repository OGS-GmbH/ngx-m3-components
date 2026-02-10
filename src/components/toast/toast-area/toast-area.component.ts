import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastComponent } from "../toast-message/toast.component";
import { NgComponentOutlet } from '@angular/common';
import { ToastStoreService } from '../../../services/toast/toast-store.service';
import { ToastConfig, ToastRendererDef } from '../../../types/toast/toast-config.types';
import { TOAST_INJECTION_TOKEN } from '../../../tokens/toast.token';
import { UntypedToast } from '../../../types/toast/toast.types';

@Component({
  selector: 'ogs-m3-toast-area',
  standalone: true,
  imports: [ ToastComponent, NgComponentOutlet ],
  templateUrl: './toast-area.component.html',
  styleUrl: './toast-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastAreaComponent {
  private _toastStoreService: ToastStoreService = inject(ToastStoreService);

  // eslint-disable-next-line @tseslint/no-explicit-any
  private _toastConfig: ToastConfig<any> = inject(TOAST_INJECTION_TOKEN);

  protected readonly toasts: Signal<UntypedToast[] | undefined> = toSignal(this._toastStoreService.toasts$);

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
