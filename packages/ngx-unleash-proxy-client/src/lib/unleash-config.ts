import { InjectionToken } from "@angular/core";
import { IConfig } from "unleash-proxy-client";

export const UnleashConfig = new InjectionToken<IConfig>('unleashConfig');
