import { ChangeDetectionStrategy, Component, HostListener, inject, input, InputSignal } from '@angular/core';
import { ProcessService } from '@core/services/process/process.service';
import { Process } from '@core/types/process.types';
import { IconModule } from "@ogs/ngx-m3-components";
import { DateTimeComponent } from '@shared/components/date-time/date-time.component';
import { MatButtonModule } from "@angular/material/button";
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { provideTranslationScope, TranslationPipeModule } from '@ogs-gmbh/ngx-translate';
import { NotificationMenuService } from '@core/components/notification/notification-menu/services/notification-menu.service';

@Component({
  selector: 'app-process-toast',
  standalone: true,
  templateUrl: './process-toast.component.html',
  styleUrl: './process-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ IconModule, DateTimeComponent, MatButtonModule, TranslationPipeModule ],
  providers: [ provideTranslationScope("core/process-toast") ]
})

export class ProcessToastComponent {
  private _faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  private _notificationMenuService: NotificationMenuService = inject(NotificationMenuService);

  private _processService: ProcessService = inject(ProcessService);

  public process: InputSignal<Process> = input.required();


  @HostListener("click")
  protected onNotificationClick (): void {
    this._notificationMenuService.requestMenuOpen();
  }

  protected onDownloadClick (clickEvent: MouseEvent): void {
    this._processService.downloadProcess(this.process()).subscribe();
    clickEvent.stopPropagation();
  }

  constructor () {
    this._faIconLibrary.addIcons(faDownload);
  }
}
