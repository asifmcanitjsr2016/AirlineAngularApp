import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) { }
  canActivate() {
    if (this.auth.isAdminOrUser()) {
      return true;
    }
    this.route.navigate(['search-flights']);
    return false;
  }

}
