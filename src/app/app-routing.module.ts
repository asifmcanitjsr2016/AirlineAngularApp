import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';

const routes: Routes = [
  {path:'',redirectTo:'search-flights', pathMatch:'full'},
  {path:'search-flights',component:SearchFlightsComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
