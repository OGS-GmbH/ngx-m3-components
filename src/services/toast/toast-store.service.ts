import { inject, Injectable } from "@angular/core";
import { animationFrameScheduler, BehaviorSubject, Observable, Subscription, throttleTime, timer } from "rxjs";
import { ToastConfig } from "../../types/toast/toast-config.types";
import { UntypedToast } from "../../types/toast/toast.types";
import { TOAST_INJECTION_TOKEN } from "../../tokens/toast.token";

const DEFAULT_DURATION: number = 6000;

@Injectable({
  providedIn: "root"
})
export class ToastStoreService {
  // eslint-disable-next-line @tseslint/no-explicit-any
  private _toastConfig: ToastConfig<any> = inject(TOAST_INJECTION_TOKEN);

  private _toasts$: BehaviorSubject<UntypedToast[]> = new BehaviorSubject<UntypedToast[]>([]);

  /**
   * The observable of the toast-store. is throttled to schedule possible animations of the toast.
   */
  public toasts$: Observable<UntypedToast[]> = this._toasts$.asObservable().pipe(
    throttleTime(0, animationFrameScheduler, { leading: true, trailing: true })
  );

  private _timerSubscriptions: Map<string, Subscription> = new Map<string, Subscription>();

  /**
   * Adds a toast to the store. And if the toast has a Time To Live (TTL) a timer gets started to clean up the toast after given duration.
   * if the max number of Toasts is reached removes the first one from the store.
   * @param toast - toast to add
   */
  public addToast (toast: UntypedToast): void {
    if (!toast.id) return;

    this._toasts$.next([ ...this._toasts$.getValue(), toast ]);

    if (!toast.isSticky) {
      // eslint-disable-next-line @tseslint/no-non-null-assertion
      const timerSubscription: Subscription = timer(toast.ttl ?? this._toastConfig.toastDefaultDuration ?? DEFAULT_DURATION).subscribe(() => this.removeToast(toast.id!));

      this._timerSubscriptions.set(toast.id, timerSubscription);
    }

    if (this._toasts$.getValue().length > this._toastConfig.maxNumberOfToasts)
      // eslint-disable-next-line @tseslint/no-non-null-assertion
      this.removeToast(this._toasts$.getValue()[ 0 ]!.id!);
  }


  /**
   * Removes a toast from the store and cleans up any remaining timer subscription
   * @param toastId - the id of the toast to remove
   */
  public removeToast (toastId: string): void {
    this._toasts$.next(this._toasts$.getValue().filter((toast: UntypedToast) => toast.id !== toastId));
    this._timerSubscriptions.get(toastId)?.unsubscribe();
    this._timerSubscriptions[ "delete" ](toastId);
  }
}
