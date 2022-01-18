import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'snowfrog-protected',
  template: `
    <p>
      protected works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProtectedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
