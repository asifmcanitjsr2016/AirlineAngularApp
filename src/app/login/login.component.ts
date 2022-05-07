import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from '../models/Login';
import { LoginService } from '../services/login.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  
  hide = true;  
  login:Login={
    username:'',
    password:''
  }
  constructor(private _loginService:LoginService,
    private _spinner:NgxSpinnerService,
    private _snackbar:MatSnackBar,
    private router: Router,
    private _shared:SharedService
    ) {
    this.loginForm=FormGroup;
   }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit(){

    if(this.loginForm.valid){
      this.login=Object.assign(this.login,this.loginForm.value);
      this._loginService.LoginUser(this.login)
      .subscribe(
      data => {
        sessionStorage.setItem('loginDetails',JSON.stringify(data));
        // let storedData=sessionStorage.getItem('loginDetails');
        // let item = storedData!=null?JSON.parse(storedData):'{}';

        this._shared.emitter.next(data);
        this._spinner.hide();
        if(data?.usertype=='User' || data?.usertype=='Admin'){
          this.router.navigate([""]);                    
          console.log("Observable Data:",data);
        }
        else{
          this._snackbar.openFromComponent(SucessMessageComponent, {
            duration: 5000,
            panelClass: 'sucessSnackbar',
            horizontalPosition: 'end',
            data: "Invalid Username or Password"
          });
          console.log("Observable Data:",data);
        }                              
      },
      err => {
        let errMessage = err;
        this._spinner.hide();
        console.log(errMessage);
        this._snackbar.openFromComponent(ErrorMessageComponent, {
          duration: 5000,
          panelClass: 'errorSnackbar',
          horizontalPosition: 'end',
          data: errMessage
        });
      });
    }

  }

}
