import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxUnleashProxyClientModule, UnleashGuard } from '@snowfrog/ngx-unleash-proxy-client';
import { ProtectedComponent } from './protected/protected.component';

@NgModule({
  declarations: [AppComponent, ProtectedComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'protected',
        component: ProtectedComponent,
        canActivate: [UnleashGuard],
        data: { toggleName: 'testing-toggles', redirectUrl: '/' },
      },
    ]),
    NgxUnleashProxyClientModule.init({
      url: 'https://unleash-dev-proxy.innago.com/proxy',
      clientKey: 'VjY7B3#oG@AvIR^',
      appName: 'ngx-unleash-proxy-client-app',
      refreshInterval: 5,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
