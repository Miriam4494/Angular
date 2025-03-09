import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
 
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const authToken = authService.getToken();
  
  const authReq = authToken ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  }) : req;
  
  return next(authReq).pipe(
    tap({
      error: (error) => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(["/login"]);
        }
      }
    })
  );
};
