import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvServiceProvider } from './core/services/env.service.provider';
import { DbSetService } from './core/services/db-set.service';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localId from '@angular/common/locales/id';
import { JwtModule } from '@auth0/angular-jwt';
import { getMenuResolver } from './core/helpers/getMenu.resolver';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
registerLocaleData(localId, 'id');
export function tokkenGetter() {
	return localStorage.getItem('token');
}
import { LastActiveService } from './core/services/last-active.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutsModule,
    AppRoutingModule,
    JwtModule.forRoot({
			config: {
				tokenGetter: tokkenGetter,
				whitelistedDomains: []
			}
    }),
    ToastModule,
		ConfirmDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DbSetService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    getMenuResolver,
    MessageService,
    ConfirmationService,
    EnvServiceProvider,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [LastActiveService],
      useFactory: (lastActiveService: LastActiveService) => () =>
        lastActiveService.setUp(),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
