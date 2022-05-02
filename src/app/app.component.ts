import { Component } from '@angular/core';
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

  constructor(private _shared:SharedService){
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
    localStorage.removeItem('loginDetails');
    let storedData=localStorage.getItem('loginDetails');
    let item = storedData!=null?JSON.parse(storedData):null;
  }

}
