import { InjectionToken } from "@angular/core";
import { EmitterService } from "../interfaces/emitter-service.interface";

export const ToggleServiceToken: InjectionToken<EmitterService> = new InjectionToken<EmitterService>("emitter-service-token");
