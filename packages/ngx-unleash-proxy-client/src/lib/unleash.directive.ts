import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UnleashService } from '..';

@Directive({
  selector: '[unleash]',
})
export class UnleashDirective {
  private hasView = false;
  @Input() set unleash(toggleName: string) {
    if (this.unleashService.isEnabled(toggleName)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef, private unleashService: UnleashService) {}
}

@Directive({
  selector: '[unleashNot]',
})
export class UnleashNotDirective {
  private hasView = false;
  @Input() set unleashNot(toggleName: string) {
    if (!this.unleashService.isEnabled(toggleName)) {
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private unleashService: UnleashService
  ) {}
}
