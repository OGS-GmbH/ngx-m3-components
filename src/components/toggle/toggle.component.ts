import { ChangeDetectionStrategy, Component, booleanAttribute, AfterViewInit, WritableSignal, signal, Signal, ViewContainerRef, EmbeddedViewRef, OnDestroy, InputSignalWithTransform, input, InputSignal, output, OutputEmitterRef, contentChildren, viewChild } from "@angular/core";
import { ToggleChange } from "./toggle.type";
import { ToggleChildComponent } from "./toggle-child.component";

@Component({
  selector: "ogs-m3-toggle",
  templateUrl: "./toggle.component.html",
  styleUrl: "toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent implements AfterViewInit, OnDestroy {
  private readonly _index: WritableSignal<number> = signal<number>(0);

  public readonly index: Signal<number> = this._index.asReadonly();

  /* eslint-disable-next-line @unicorn/no-useless-undefined */
  private readonly _name: WritableSignal<string | undefined> = signal<string | undefined>(undefined);

  public readonly name: Signal<string | undefined> = this._name.asReadonly();

  public readonly reverse: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });

  public readonly defaultName: InputSignal<string | undefined> = input<string | undefined>();

  public readonly defaultIndex: InputSignal<number | undefined> = input<number | undefined>();

  public readonly toggleChange: OutputEmitterRef<ToggleChange> = output<ToggleChange>();

  public readonly children: Signal<readonly ToggleChildComponent[]> = contentChildren(ToggleChildComponent);

  public readonly viewContainerRef: Signal<ViewContainerRef> = viewChild.required("viewContainerRef", { read: ViewContainerRef });

  private _embeddedViewRef: EmbeddedViewRef<unknown> | null = null;

  private _currentToggleChild: ToggleChildComponent | null = null;

  private _updateNameByIndex (index: number): void {
    const child: ToggleChildComponent | undefined = this.children()[index];
    const childName: string | undefined = child?.name();

    this._name.set(childName);
  }

  private _handleToggleDelegate (visibleName: string | undefined, handler: () => void): void {
    this.toggleChange.emit({
      complete: handler,
      name: visibleName
    });
  }

  public showName (visibleName: string): void {
    this.children().forEach((toggleChild: ToggleChildComponent, index: number): void => {
      if (toggleChild.name() !== visibleName)
        return;

      this._handleToggleDelegate(
        toggleChild.name(),
        () => {
          this._embeddedViewRef?.destroy();
          /* eslint-disable-next-line @angular/no-lifecycle-call */
          this._currentToggleChild?.ngOnDestroy();
          this._index.set(index);
          this._updateNameByIndex(index);
          this._embeddedViewRef = this.viewContainerRef().createEmbeddedView(toggleChild.templateRef());
          this._currentToggleChild = toggleChild;
        }
      );
    });
  }

  public showIndex (visibleIndex: number): void {
    this.children().forEach((toggleChild: ToggleChildComponent, index: number): void => {
      if (index !== visibleIndex)
        return;

      this._handleToggleDelegate(
        toggleChild.name(),
        () => {
          this._embeddedViewRef?.destroy();
          /* eslint-disable-next-line @angular/no-lifecycle-call */
          this._currentToggleChild?.ngOnDestroy();
          this._index.set(index);
          this._updateNameByIndex(index);
          this._embeddedViewRef = this.viewContainerRef().createEmbeddedView(toggleChild.templateRef());
          this._currentToggleChild = toggleChild;
        }
      );
    });
  }

  public showNext (): void {
    const index: number = this._index();
    const nextIndex: number = index === this.children.length - 1
      ? 0
      : index + 1;

    this.showIndex(nextIndex);
  }

  public showPrevious (): void {
    const index: number = this._index();
    const nextIndex: number = index === 0
      ? this.children.length - 1
      : index - 1;

    this.showIndex(nextIndex);
  }

  public toggle (): void {
    this.reverse()
      ? this.showPrevious()
      : this.showNext();
  }

  public ngAfterViewInit (): void {
    const defaultName: string | undefined = this.defaultName();
    const defaultIndex: number | undefined = this.defaultIndex();
    if (defaultName)
      this.showName(defaultName);
    else if (defaultIndex)
      this.showIndex(defaultIndex);
    else
      this.showIndex(this._index());
  }

  public ngOnDestroy (): void {
    this._embeddedViewRef?.destroy();
    this._embeddedViewRef = null;
  }
}
