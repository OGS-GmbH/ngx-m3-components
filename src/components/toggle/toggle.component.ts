import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, booleanAttribute, Output, EventEmitter, AfterViewInit, WritableSignal, signal, Signal, ViewChild, ViewContainerRef, EmbeddedViewRef, OnDestroy } from "@angular/core";
import { ToggleDelegate } from "./toggle.type";
import { ToggleChildComponent } from "./toggle-child.component";

@Component({
  selector: "ogs-m3-toggle",
  templateUrl: "./toggle.component.html",
  styleUrl: "toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent implements AfterViewInit, OnDestroy {
  private _index: WritableSignal<number> = signal<number>(0);

  public index: Signal<number> = this._index.asReadonly();

  /* eslint-disable-next-line @unicorn/no-useless-undefined */
  private _name: WritableSignal<string | undefined> = signal<string | undefined>(undefined);

  public name: Signal<string | undefined> = this._name.asReadonly();

  @Input({ required: false, transform: booleanAttribute })
  public reverse: boolean = false;

  @Input({ required: false })
  public defaultName?: string;

  @Input({ required: false })
  public defaultIndex?: number;

  @Output()
  public readonly toggleDelegate: EventEmitter<ToggleDelegate> = new EventEmitter<ToggleDelegate>();

  @ContentChildren(ToggleChildComponent)
  protected children: QueryList<ToggleChildComponent> | undefined;

  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  protected viewContainerRef!: ViewContainerRef;

  private _embeddedViewRef: EmbeddedViewRef<unknown> | null = null;

  private _currentToggleChild: ToggleChildComponent | null = null;

  private _updateNameByIndex (index: number): void {
    const child: ToggleChildComponent | undefined = this.children?.get(index);
    const childName: string | undefined = child?.name;

    this._name.set(childName);
  }

  private _handleToggleDelegate (visibleName: string | undefined, handler: () => void): void {
    if (!this.toggleDelegate.observed) {
      handler();

      return;
    }

    this.toggleDelegate.emit({
      complete: handler,
      name: visibleName
    });
  }

  public showName (visibleName: string): void {
    this.children?.forEach((toggleChild: ToggleChildComponent, index: number): void => {
      if (toggleChild.name !== visibleName)
        return;

      this._handleToggleDelegate(
        toggleChild.name,
        () => {
          this._embeddedViewRef?.destroy();
          this._currentToggleChild?.ngOnDestroy();
          this._index.set(index);
          this._updateNameByIndex(index);
          this._embeddedViewRef = this.viewContainerRef.createEmbeddedView(toggleChild.templateRef);
          this._currentToggleChild = toggleChild;
        }
      );
    });
  }

  public showIndex (visibleIndex: number): void {
    this.children?.forEach((toggleChild: ToggleChildComponent, index: number): void => {
      if (index !== visibleIndex)
        return;

      this._handleToggleDelegate(
        toggleChild.name,
        () => {
          this._embeddedViewRef?.destroy();
          this._currentToggleChild?.ngOnDestroy();
          this._index.set(index);
          this._updateNameByIndex(index);
          this._embeddedViewRef = this.viewContainerRef.createEmbeddedView(toggleChild.templateRef);
          this._currentToggleChild = toggleChild;
        }
      );
    });
  }

  public showNext (): void {
    if (this.children === undefined)
      return;

    const index: number = this._index();
    const nextIndex: number = index === this.children.length - 1
      ? 0
      : index + 1;

    this.showIndex(nextIndex);
  }

  public showPrevious (): void {
    if (this.children === undefined)
      return;

    const index: number = this._index();
    const nextIndex: number = index === 0
      ? this.children.length - 1
      : index - 1;

    this.showIndex(nextIndex);
  }

  public toggle (): void {
    this.reverse
      ? this.showPrevious()
      : this.showNext();
  }

  public ngAfterViewInit (): void {
    if (this.defaultName !== undefined)
      this.showName(this.defaultName);
    /* eslint-disable-next-line no-negated-condition, @unicorn/no-negated-condition */
    else if (this.defaultIndex !== undefined)
      this.showIndex(this.defaultIndex);
    else
      this.showIndex(this._index());
  }

  public ngOnDestroy (): void {
    this._embeddedViewRef?.destroy();
    this._embeddedViewRef = null;
  }
}
