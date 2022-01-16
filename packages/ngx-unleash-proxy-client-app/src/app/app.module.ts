import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxUnleashDirectiveModule, NgxUnleashProxyClientModule } from '@snowfrog/ngx-unleash-proxy-client';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    NgxUnleashProxyClientModule.init({
      url: 'https://unleash-dev-proxy.innago.com/proxy',
      clientKey: 'VjY7B3#oG@AvIR^',
      appName: 'ngx-unleash-proxy-client-app',
      refreshInterval: 5
    }),
    NgxUnleashDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
