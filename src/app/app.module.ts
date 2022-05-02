import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SucessMessageComponent } from './sucess-message/sucess-message.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SearchFlightsComponent,
    SucessMessageComponent,
    ErrorMessageComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
