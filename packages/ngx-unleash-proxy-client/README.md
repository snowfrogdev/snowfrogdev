# ngx-unleash-proxy-client

This library is meant to be used with the [unleash-proxy](https://github.com/Unleash/unleash-proxy). The proxy application layer will sit between your unleash instance and your client applications, and provides performance and security benefits. DO NOT TRY to connect this library directly to the unleash instance, as the datasets follow different formats because the proxy only returns evaluated toggle information.

## Getting started

### Step 1: Unleash Proxy

Before you can use this Unleash SDK you need to set up a Unleash Proxy instance. [Read more about the Unleash Proxy](https://docs.getunleash.io/sdks/unleash-proxy).

### Step 2: Install

```bash
npm install ngx-unleash-proxy-client
```

### Step 3: Initialize the SDK

You need to have a Unleash-hosted instance, and the proxy needs to be enabled. In addition you will need a proxy-specific clientKey in order to connect to the Unleash-hosted Proxy.

Here is how to initialize the client SDK:

```typescript
import { NgxUnleashProxyClientModule } from '@snowfrog/ngx-unleash-proxy-client';

@NgModule({
  imports: [
    NgxUnleashProxyClientModule.init({
      url: 'https://unleash-proxy.myapp.com/proxy',
      clientKey: 'MyClientKey',
      appName: 'My Angular App Name',
    }),
  ],
})
export class AppModule {}
```

This step will initialize the library, before the Angular app is completely bootstrapped, insuring that
the library is ready to use and the toggle data is available before users can interact with the app.

## How to check toggle states

To check if a toggle is enabled from within a Component or Service, you can use the `isEnabled` method:

```typescript
import { UnleashService } from '@snowfrog/ngx-unleash-proxy-client';

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class TestComponent {
  constructor(private unleash: UnleashService) {}
  get title(): string {
    if(this.unleash.isEnabled('test.toggle')) {
      return 'The toggle is on';
    }
    return 'The toggle is off';
  }
}
```

To check if a toggle is enabled from within a Component template, you can use the `unleash` and `unleashNot`
directives:

```html
<some-component *unleash="'test.toggle'"></some-component>
<some-other-component *unleashNot="'test.toggle'"></some-other-component>
```

To prevent navigation to a route based on a toggle, you can use the `UnleashGuard`:

```typescript
import { UnleashGuard } from '@snowfrog/ngx-unleash-proxy-client';

const routes = [
  {
    path: 'test',
    component: TestComponent,
    canActivate: [UnleashGuard],
    data: { toggleName: 'test.toggle', is: true, redirectUrl: '/' }  
  },
]
```

To check variants:

```typescript
import { UnleashService } from '@snowfrog/ngx-unleash-proxy-client';

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class TestComponent {
  constructor(private unleash: UnleashService) {}
  get title(): string {
    const variant = this.unleash.getVariant('test.variant');
    if(variant === 'blue) {
      // something with variant blue
    }
}
```

## How to update the Unleash Context

Follow the following steps in order to update the Unleash context:

```typescript
import { UnleashService } from '@snowfrog/ngx-unleash-proxy-client';

@Injectable()
export class SomeService {
  constructor(private unleash: UnleashService) {}
  
  someOperation() {
    this.unleash.updateContext({
      userId: '123',
      userName: 'John Doe',
      userEmail: 'john@doe.com',
    });
  }
}
```

## Documentation

https://snowfrogdev.github.io/snowfrogdev/ngx-unleash-proxy-client/

## License

MIT License

Copyright (c) 2022 Philippe Vaillancourt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
