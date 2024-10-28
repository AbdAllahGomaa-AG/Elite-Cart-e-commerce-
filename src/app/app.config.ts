import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { headersInterceptor } from '../core/inspectors/headers.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { errInterceptor } from '../core/inspectors/err.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from '../core/inspectors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, errInterceptor, loadingInterceptor])
    ),
    importProvidersFrom(
      NgxSpinnerModule,
      TranslateModule.forRoot({
        defaultLanguage:'en',
        loader: {

          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
