import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { TranslationPipeModule } from '@ogs-gmbh/ngx-translate';
import { TranslationInfo } from '@shared/types/translation-info';

@Component({
  selector: 'app-message-toast',
  standalone: true,
  imports: [ TranslationPipeModule ],
  templateUrl: './message-toast.component.html',
  styleUrl: './message-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastComponent {
  title: InputSignal<string | undefined> = input<string | undefined>();

  localizedTitle: InputSignal<TranslationInfo | undefined> = input<TranslationInfo | undefined>();

  text: InputSignal<string | undefined> = input<string | undefined>();

  localizedText: InputSignal<TranslationInfo | undefined> = input<TranslationInfo | undefined>();
}
