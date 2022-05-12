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
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { BookingComponent } from './booking/booking.component';
import { AirlineDetailsComponent } from './airline-details/airline-details.component';
import { TicketDetailsDialogComponent } from './Modals/ticket-details-dialog/ticket-details-dialog.component';
import { InfoMessageComponent } from './info-message/info-message.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FlightConfirmDialogComponent } from './flight-confirm-dialog/flight-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    SearchFlightsComponent,
    SucessMessageComponent,
    ErrorMessageComponent,
    AddAirlineComponent,
    BookingComponent,
    AirlineDetailsComponent,
    TicketDetailsDialogComponent,
    InfoMessageComponent,
    ConfirmDialogComponent,
    FlightConfirmDialogComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
