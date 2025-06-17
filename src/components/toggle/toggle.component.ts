import { ChangeDetectionStrategy, Component, ContentChildren, Input, inject, QueryList, Renderer2, booleanAttribute, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from "@angular/core";
import { ToggleChildComponent } from "./components/toggle-child.component";

@Component({
  selector: "ogs-m3-toggle",
  templateUrl: "toggle.component.html",
  styleUrl: "toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent implements OnChanges, OnDestroy, AfterViewInit {
  private _renderer2: Renderer2 = inject(Renderer2);

  private _unlistener: Array<(() => void)> | null = null;

  private _currentVisibleIndex: number = 0;

  @Input({ required: false, transform: booleanAttribute })
  public reverse: boolean = false;

  /**
   * Set the visibile child name, that should be initially shown when the name matches.
   */
  @Input({ required: false })
  public defaultVisibleName?: string;

  /*
   * Set the visible index of some child, that should be initially shown when the index matches.
   */
  @Input({ required: false })
  public defaultVisibleIndex?: number;

  @Input({ required: false })
  public triggerElement?: HTMLElement;

  @Input({ required: false })
  public triggerRef?: ElementRef<unknown>;

  @Input({ required: false })
  public eventName: string | string[] = "click";

  @Output()
  public toggle: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  @ContentChildren(ToggleChildComponent)
  private _children!: QueryList<ToggleChildComponent>;

  private _updateByDirection (): void {
    if (this.reverse) {
      this._currentVisibleIndex === 0
        ? this._currentVisibleIndex = this._children.length - 1
        : --this._currentVisibleIndex;

      return;
    }

    this._currentVisibleIndex === this._children.length - 1
      ? this._currentVisibleIndex = 0
      : ++this._currentVisibleIndex;
  }

  private _getIndexByName (_name: string): number | null {
    let foundIndex: number | null = null;

    this._children.forEach((child: ToggleChildComponent, childIndex: number): void => {
      if (child.name !== _name)
        return;

      foundIndex = childIndex;
    });

    return foundIndex;
  }

  private _appendToUnlistener (callback: () => void): void {
    this._unlistener === null
      ? this._unlistener = [ callback ]
      : this._unlistener.push(callback);
  }

  private _toggleChildByName (_name: string): void {
    this._children.forEach((child: ToggleChildComponent, childIndex: number): void => {
      const isVisible: boolean = child.name !== undefined && child.name === _name;

      if (!isVisible) {
        child.hide();

        return;
      }

      this._currentVisibleIndex = childIndex;
      child.show();
      this.toggle.emit(child.name);
    });
  }

  private _toggleChildByIndex (index: number): void {
    this._children.forEach((child: ToggleChildComponent, childIndex: number): void => {
      const isVisible: boolean = index === childIndex;

      if (!isVisible) {
        child.hide();

        return;
      }

      this._currentVisibleIndex = childIndex;
      child.show();
      this.toggle.emit(child.name);
    });
  }

  private _attachListener (element: HTMLElement): void {
    const eventName: string[] = Array.isArray(this.eventName) ? this.eventName : [ this.eventName ];

    eventName.forEach((eventNameItem: string): void => {
      this._appendToUnlistener(
        this._renderer2.listen(element, eventNameItem, this._handleClickTrigger.bind(this))
      );
    });
  }

  private _detachListener (): void {
    this._unlistener?.forEach((unlistenerItem: () => void) => {
      unlistenerItem();
    });
    this._unlistener = null;
  }

  private _handleClickTrigger (): void {
    this._updateByDirection();
    this._toggleChildByIndex(this._currentVisibleIndex);
  }

  public showName (_name: string): void {
    this._toggleChildByName(_name);
  }

  public ngOnChanges (changes: SimpleChanges): void {
    const shouldHandleTriggerChange: boolean = changes[ "triggerElement" ] !== undefined || changes[ "triggerRef" ] !== undefined;

    if (shouldHandleTriggerChange) {
      const element: HTMLElement | undefined = (changes[ "triggerElement" ]?.currentValue ?? (changes[ "triggerRef" ]?.currentValue as typeof this.triggerRef)?.nativeElement) as HTMLElement | undefined;

      this._detachListener();

      if (element === undefined)
        return;

      this._attachListener(element);
    }
  }

  public ngAfterViewInit (): void {
    if (this.defaultVisibleName !== undefined) {
      this._toggleChildByName(this.defaultVisibleName);

      return;
    } else if (this.defaultVisibleIndex !== undefined)
      this._currentVisibleIndex = this.defaultVisibleIndex;

    this._toggleChildByIndex(this._currentVisibleIndex);
  }

  public ngOnDestroy (): void {
    this._detachListener();
  }
}
