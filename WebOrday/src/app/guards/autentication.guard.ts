import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token/auth-token.service';

export const autenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authTokenService = inject(AuthTokenService);
  const token = authTokenService.getToken();
  //const token: string | null = sessionStorage.getItem('token');
  if(token === null){
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
  
};
