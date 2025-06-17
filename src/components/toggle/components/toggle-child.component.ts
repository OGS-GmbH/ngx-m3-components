import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from "@angular/core";

@Component({
  selector: "ogs-m3-toggle-child",
  templateUrl: "toggle-child.component.html",
  styleUrl: "toggle-child.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.hidden]": "this.isHidden()"
  }
})
export class ToggleChildComponent {
  public readonly isHidden: WritableSignal<boolean> = signal<boolean>(false);

  @Input({ required: false })
  public name?: string;

  public hide (): void {
    this.isHidden.set(true);
  }

  public show (): void {
    this.isHidden.set(false);
  }
}
