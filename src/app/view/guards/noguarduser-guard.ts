import { CanActivateFn,Router } from '@angular/router';
import { AuthUser } from '../services/auth-user';
import { inject } from '@angular/core';

export const noguarduserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(AuthUser);

  if (!userService.IsUserLoggedIn()) {
    return true;
  } else {
    router.navigate(['/allstudents']);
    return false;
  }
};
