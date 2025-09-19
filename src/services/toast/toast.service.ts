import { GlobalPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { ToastStoreService } from "./toast-store.service";
import { TOAST_INJECTION_TOKEN } from "../../tokens/toast.token";
import { BottomMargin, LeftMargin, RightMargin, ToastConfig, TopMargin, VIEW_PORT_MARGINS } from "../../types/toast/toast-config.types";
import { UntypedToast } from "../../types/toast/toast.types";
import { ToastAreaComponent } from "../../components/toast/toast-area/toast-area.component";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  // eslint-disable-next-line @tseslint/no-explicit-any
  private _toastConfig: ToastConfig<any> = inject(TOAST_INJECTION_TOKEN);

  private _toastStoreService: ToastStoreService = inject(ToastStoreService);

  private _overlay: Overlay = inject(Overlay);

  private _overlayRef?: OverlayRef;

  constructor () {
    this.createToastPortal();
  }

  /**
   * Show a toast
   * @param toast - the toast to display
   *
   * @return the assigned id of the toast
   */
  public show (toast: UntypedToast): string {
    const toastId: string = crypto.randomUUID();
    const toastMessage: UntypedToast = { ...toast, id: toastId };

    this._toastStoreService.addToast(toastMessage);

    return toastId;
  }

  /**
   * Close a Toast
   * @param toast - the id of the toast (is a automatically assigned uuid)
   */
  public close (toastId: string): void {
    this._toastStoreService.removeToast(toastId);
  }

  private createToastPortal (): void {
    const position: GlobalPositionStrategy = this.getOverlayPosition();

    this._overlayRef = this._overlay.create({
      positionStrategy: position,
      hasBackdrop: false
    });

    const toastPortal: ComponentPortal<ToastAreaComponent> = new ComponentPortal<ToastAreaComponent>(ToastAreaComponent);

    this._overlayRef.attach(toastPortal);
  }

  private getOverlayPosition (): GlobalPositionStrategy {
    let positionStrategy: GlobalPositionStrategy = this._overlay
      .position()
      .global();

    const verticalPosition: TopMargin | BottomMargin = this._toastConfig.overlayPosition.verticalPosition;

    positionStrategy = verticalPosition.alignment === VIEW_PORT_MARGINS.TOP ? positionStrategy.top(verticalPosition.value) : positionStrategy.bottom(verticalPosition.value);

    const horizontalPosition: LeftMargin | RightMargin = this._toastConfig.overlayPosition.horizontalPosition;

    positionStrategy = horizontalPosition.alignment === VIEW_PORT_MARGINS.LEFT ? positionStrategy.left(horizontalPosition.value) : positionStrategy.right(horizontalPosition.value);

    return positionStrategy;
  }
}
