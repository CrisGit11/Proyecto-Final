import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token: string | null = sessionStorage.getItem('token');
  if(token === null){
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
  
};
