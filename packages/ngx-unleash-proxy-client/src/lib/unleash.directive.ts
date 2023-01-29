import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnleashService } from './unleash.service';

@Directive({
  selector: '[unleash]',
})
export class UnleashDirective implements OnInit, OnDestroy {
  private hasView = false;
  private toggleName = '';
  private sub!: Subscription;

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

  ngOnInit(): void {
    this.sub = this.unleashService.onUpdate.subscribe(() => {
      this.unleash = this.toggleName;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

@Directive({
  selector: '[unleashNot]',
})
export class UnleashNotDirective implements OnInit, OnDestroy {
  private hasView = false;
  private toggleName = '';
  private sub!: Subscription;

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

  ngOnInit(): void {
    this.sub = this.unleashService.onUpdate.subscribe(() => {
      this.unleashNot = this.toggleName;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
