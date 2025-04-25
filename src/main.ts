import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// bootstraps the app and sets up core providers
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // makes navigation work like ionic expects
    provideIonicAngular(), // sets up ionic stuff for standalone components
    provideHttpClient(), // needed for api calls and observable stuff
    provideRouter(routes, withPreloading(PreloadAllModules)), // router setup with preloading to make page loads faster
  ],
});
