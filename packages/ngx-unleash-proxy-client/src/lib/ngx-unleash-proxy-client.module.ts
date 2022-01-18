import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnleashConfig } from './internal';
import { UnleashDirective, UnleashNotDirective } from './unleash.directive';
import { UnleashConfigToken } from './unleash-config';
import { UnleashService } from './unleash.service';

@NgModule({
  imports: [CommonModule],
  declarations: [UnleashDirective, UnleashNotDirective],
  exports: [UnleashDirective, UnleashNotDirective],
})
export class NgxUnleashProxyClientModule {
  static init(config: UnleashConfig): ModuleWithProviders<NgxUnleashProxyClientModule> {
    return {
      ngModule: NgxUnleashProxyClientModule,
      providers: [
        { provide: UnleashConfigToken, useValue: config },
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
