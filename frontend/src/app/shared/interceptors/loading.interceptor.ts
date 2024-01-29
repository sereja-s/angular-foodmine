import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { inject } from '@angular/core';

var pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (
	req: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
	const loadingService = inject(LoadingService);
	loadingService.showLoading();
	pendingRequests = pendingRequests + 1;
	return next(req).pipe(
		tap({
			next: (event) => {
				if (event.type === HttpEventType.Response) {

					pendingRequests = pendingRequests - 1;
					if(pendingRequests === 0)
					loadingService.hideLoading();
				}
			},
			error: (_) => {

				pendingRequests = pendingRequests - 1;
					if(pendingRequests === 0)
					loadingService.hideLoading();
			}
	  })
	);
	
};