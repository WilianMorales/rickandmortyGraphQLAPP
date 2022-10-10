import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderModule } from '@shared/components/header/header.module';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    HeaderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
