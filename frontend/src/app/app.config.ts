import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(withInterceptors(
			[loadingInterceptor, authInterceptor]
	  )),
		provideAnimations(), // required animations providers
		provideToastr(
			{
				timeOut: 7000,
				positionClass: 'toast-bottom-right',
				newestOnTop: false,
			 }
		), // Toastr providers
	]
};
