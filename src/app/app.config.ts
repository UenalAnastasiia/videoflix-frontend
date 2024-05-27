import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './auth/services/auth.service';
import { AuthIntercepterService } from './auth/services/auth-intercepter.service';
import { IMAGE_CONFIG } from '@angular/common';
import { AuthGuard } from './auth/services/auth-guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true
    },
    {
      provide: IMAGE_CONFIG,
        useValue: {
          disableImageSizeWarning: true, 
          disableImageLazyLoadWarning: true
        }
    }
  ]
};