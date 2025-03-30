import { CanActivateFn, Router } from '@angular/router';
import { AuthService, } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.getCurrentUser()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
