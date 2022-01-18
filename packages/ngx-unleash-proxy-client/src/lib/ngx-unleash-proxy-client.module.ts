import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnleashService } from './unleash.service';
import { IConfig } from 'unleash-proxy-client';
import { UnleashConfig } from './unleash-config';
import { UnleashDirective, UnleashNotDirective } from './unleash.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [UnleashDirective, UnleashNotDirective],
  exports: [UnleashDirective, UnleashNotDirective],
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
