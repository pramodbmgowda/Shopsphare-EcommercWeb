import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const userService = inject(UserService);
  const router = inject(Router);

  const token = userAuthService.getToken();

  if (token) {
    const allowedRoles = route.data?.['roles'] as string[];

    if (allowedRoles) {
      const hasAccess = userService.roleMatch(allowedRoles);
      if (hasAccess) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }

    return true; //If no roles are specified, allow access
  }

  router.navigate(['/login']); // Redirect to login if user is not authenticated
  return false;
};
