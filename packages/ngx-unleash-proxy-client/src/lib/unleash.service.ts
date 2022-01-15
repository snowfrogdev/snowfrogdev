import { ApplicationRef, Inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { fromEvent, Observable, take, tap } from 'rxjs';

import { IConfig, UnleashClient } from 'unleash-proxy-client';

export const UnleashConfig = new InjectionToken<IConfig>('unleashConfig');

@Injectable({
  providedIn: 'root',
})
export class UnleashService {
  private unleash: UnleashClient;
  public onInitialized: Observable<unknown>;
  public onUpdate: Observable<unknown>;
  public onError: Observable<Error>;

  constructor(@Inject(UnleashConfig) config: IConfig, @Inject(Injector) private injector: Injector) {
    this.unleash = new UnleashClient(config);
    this.onInitialized = fromEvent(this.unleash, 'initialized').pipe(
      take(1),
      tap(() => this.unleash.start())
    );
    this.onError = fromEvent(this.unleash, 'error');
    this.onUpdate = fromEvent(this.unleash, 'update').pipe(tap(() => {
      this.injector.get(ApplicationRef).tick()
    }));
  }

  public isEnabled(featureName: string): boolean {
    return this.unleash.isEnabled(featureName);
  }
}
