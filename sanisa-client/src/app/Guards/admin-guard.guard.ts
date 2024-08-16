import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Common/Authentication/auth.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.UserIsAdmin()) {
    return true;
  } else {
    router.navigate(['/login'])
    return false
  }
};
