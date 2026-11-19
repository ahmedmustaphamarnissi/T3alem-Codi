import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdminAuth } from '../services/admin-auth';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminService = inject(AdminAuth);

  if (adminService.IsLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};