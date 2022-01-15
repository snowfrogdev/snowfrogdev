import { ApplicationRef, APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnleashConfig, UnleashService } from './unleash.service';
import { IConfig } from 'unleash-proxy-client';

@NgModule({
  imports: [CommonModule],
})
export class NgxUnleashProxyClientModule {
  static init(config: IConfig): ModuleWithProviders<NgxUnleashProxyClientModule> {
    return {
      ngModule: NgxUnleashProxyClientModule,
      providers: [
        { provide: UnleashConfig, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: (unleashService: UnleashService) => () => unleashService.onInitialized,
          deps: [UnleashService],
          multi: true,
        },
      ],
    };
  }
}
