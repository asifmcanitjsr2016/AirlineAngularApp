import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn(){
    if(sessionStorage.getItem('loginDetails') !=null){
      return true;
    }
    return false;
  }

  isAdminOrUser(){    
    let loginData=sessionStorage.getItem('loginDetails');
      let item=loginData!=null?JSON.parse(loginData):null;
      if(item.usertype == 'Admin'){
        return true;
      }
      return false;
     
  }
}
