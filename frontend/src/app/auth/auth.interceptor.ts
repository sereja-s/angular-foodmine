import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

	const userService = inject(UserService);

	const user = userService.currentUser;

	 if(user.token)
    {
      req = req.clone({
        setHeaders:{
          access_token: user.token
        }
      })
    }

  return next(req);
};
