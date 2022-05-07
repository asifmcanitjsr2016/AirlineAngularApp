import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUser=false;
  isAdmin=false;
  isLoggedIn=false;
  title = 'AirlineAngularApp';

  userProfile:any;

  constructor(private _shared:SharedService,private router: Router){
    
    let storedData=sessionStorage.getItem('loginDetails');
    let data = storedData!=null?JSON.parse(storedData):null;
    this.userProfile=data;
    
    if(data?.usertype=='Admin'){
      this.isAdmin=true;
      this.isLoggedIn=true;
    }
    else if(data?.usertype == 'User'){
      this.isUser=true;
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
    this._shared.getEmittedValue().subscribe(res => this.LoginDataReceived(res));
  }

  LoginDataReceived(data:any){
    this.userProfile=data;
    if(data?.usertype=='Admin'){
      this.isAdmin=true;
      this.isLoggedIn=true;
    }
    else if(data?.usertype == 'User'){
      this.isUser=true;
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }

  Logout(){    
    this.isAdmin=false;
    this.isUser=false;
    this.isLoggedIn=false;
    sessionStorage.removeItem('loginDetails');    
    this.router.navigate([""]);
  }

}
