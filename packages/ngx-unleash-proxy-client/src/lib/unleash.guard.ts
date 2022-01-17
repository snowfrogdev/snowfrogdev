import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UnleashService } from './unleash.service';

@Injectable({
  providedIn: 'root',
})
export class UnleashGuard implements CanActivate {
  constructor(private unleash: UnleashService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const toggleName: string | undefined = route.data['toggleName'];
    const redirectUrl: string | undefined = route.data['redirectUrl'];
    const is: boolean = route.data['is'] ??= true;
    
    if (!toggleName) {
      const errorMessage = `UnleashGuard was used on route '${route.url}' without a 'toggleName'. You must add a 'data.toggleName' property to the Route.`;
      if (isDevMode()) throw new Error(errorMessage);
      console.error(errorMessage);
      return false;
    }

    if (this.unleash.isEnabled(toggleName) === is) {
      return true;
    }

    if (redirectUrl) this.router.navigateByUrl(redirectUrl);
    return false;
  }
}
