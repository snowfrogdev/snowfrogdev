import { ApplicationRef, Inject, Injectable, Injector } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { share, take, tap } from 'rxjs/operators'
import { UnleashClient } from 'unleash-proxy-client';
import { UnleashVariant, UnleashContext, UnleashConfig } from './internal';
import { UnleashConfigToken } from './unleash-config';


@Injectable({
  providedIn: 'root',
})
export class UnleashService {
  private unleash: UnleashClient;
  public onInitialized: Observable<unknown>;
  public onUpdate: Observable<unknown>;
  public onError: Observable<Error>;

  constructor(@Inject(UnleashConfigToken) config: UnleashConfig, @Inject(Injector) private injector: Injector) {
    this.unleash = new UnleashClient(config);
    this.onInitialized = fromEvent(this.unleash, 'initialized').pipe(
      take(1),
      tap(() => this.unleash.start())
    );
    this.onError = fromEvent<Error>(this.unleash, 'error').pipe(share());
    this.onUpdate = fromEvent(this.unleash, 'update').pipe(share());
    this.onUpdate.subscribe(() => {
      this.injector.get(ApplicationRef).tick();
    });
  }

  public isEnabled(toggleName: string): boolean {
    return this.unleash.isEnabled(toggleName);
  }

  public getVariant(toggleName: string): UnleashVariant {
    return this.unleash.getVariant(toggleName);
  }

  public updateContext(context: UnleashContext): Promise<void> {
    return this.unleash.updateContext(context);
  }
}
