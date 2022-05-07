import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { AuthGuard } from './Shared/auth.guard';
import { RoleGuard } from './Shared/role.guard';

const routes: Routes = [
  {path:'',redirectTo:'search-flights', pathMatch:'full'},
  {path:'search-flights',component:SearchFlightsComponent},
  {path:'login',component:LoginComponent},
  {path:'add-airline',component:AddAirlineComponent, canActivate:[AuthGuard, RoleGuard]},
  {path:'registration',component:RegistrationComponent},
  {path:'booking',component:BookingComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
