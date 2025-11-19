import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../../../services/toast/toast.service';
import { STATUS_TYPES, StatusType } from '../../../types/toast/toast.types';
@Component({
  selector: 'ogs-m3-toast',
  standalone: true,
  imports: [ MatButtonModule ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToastComponent {
  private _toastService: ToastService = inject(ToastService);

  public id: InputSignal<string> = input.required();

  public status: InputSignal<StatusType> = input(STATUS_TYPES.NEUTRAL as StatusType);

  protected statusTypes: typeof STATUS_TYPES = STATUS_TYPES;


  protected onCloseClick (): void {
    this._toastService.close(this.id());
  }
}
