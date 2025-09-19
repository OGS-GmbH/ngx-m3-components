import { InjectionToken } from "@angular/core";
import { ToastConfig } from "../types/toast/toast-config.types";

// eslint-disable-next-line @tseslint/no-explicit-any
export const TOAST_INJECTION_TOKEN: InjectionToken<ToastConfig<any>> = new InjectionToken<ToastConfig<any>>("TOAST_INJECTION_TOKEN");
