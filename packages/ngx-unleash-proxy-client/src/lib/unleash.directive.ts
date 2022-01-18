import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UnleashService } from '..';

@Directive({
  selector: '[unleash]',
})
export class UnleashDirective implements OnInit {
  private hasView = false;
  private toggleName = '';
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
    this.toggleName = toggleName;
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private unleashService: UnleashService
  ) {}

  ngOnInit() {
    this.unleashService.onUpdate.subscribe(() => {
      this.unleash = this.toggleName;
    });
  }
}

@Directive({
  selector: '[unleashNot]',
})
export class UnleashNotDirective implements OnInit {
  private hasView = false;
  private toggleName = '';
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

    this.toggleName = toggleName;
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private unleashService: UnleashService
  ) {}

  ngOnInit() {
    this.unleashService.onUpdate.subscribe(() => {
      this.unleashNot = this.toggleName;
    });
  }
}
