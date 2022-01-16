import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnleashDirective, UnleashNotDirective } from './unleash.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [UnleashDirective, UnleashNotDirective],
  exports: [UnleashDirective, UnleashNotDirective],
})
export class NgxUnleashDirectiveModule {}
