import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnleashService } from '@snowfrog/ngx-unleash-proxy-client';

@Component({
  selector: 'snowfrog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private unleash: UnleashService) {}
  get title(): string {
    if(this.unleash.isEnabled('testing-toggles')) {
      return 'The toggle is on';
    }
    return 'The toggle is off';
  }
}
