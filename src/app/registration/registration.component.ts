import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import { Register } from '../models/Register';
import { LoginService } from '../services/login.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm:any;
  isSelected=true;
  register:Register={
     name:"",
     age:0,
     gender:"",
     userID:"",
     password:"",
     accountCreated:new Date(),
     userType:"User"
  };
  constructor(private _loginService:LoginService,
    private _spinner:NgxSpinnerService,    
    private _notification:NotificationsService) {
    this.registrationForm = FormGroup;
   }

   ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
      gender:new FormControl('male',[Validators.nullValidator])
    });
  }
public resetForm(){
  this.registrationForm.reset({
    gender: 'male'
   });
}
  public hasError = (controlName: string, errorName: string) =>{
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(formDirective:FormGroupDirective){
    if (this.registrationForm.valid) {
      this._spinner.show();      
      this.register.age=this.registrationForm.controls.age.value;
      this.register.gender=this.registrationForm.controls.gender.value;
      this.register.name=this.registrationForm.controls.name.value;
      this.register.userID=this.registrationForm.controls.email.value;
      this.register.password=this.registrationForm.controls.password.value;

      this._loginService.RegisterUser(this.register)
      .subscribe(
      data => {
        if(data){
          formDirective.resetForm();
          this.registrationForm.reset();            
          this.resetForm();          
          this._notification.successMessage({responseType:'Registartion', message:'You have successfully register!'});
        }
        else{
          this._notification.errorMessage("Please check field values");
        }        
        this._spinner.hide();
        console.log("Observable Data:",data);        
        
      },
      err => {
        let errMessage = err;
        this._spinner.hide();
        console.log(errMessage);
        this._notification.errorMessage(errMessage);
      });      

    }        
  }
// All is this method
onPasswordChange() {
  if (this.confirm_password.value == this.password.value) {
    this.confirm_password.setErrors(null);
  } else {
    this.confirm_password.setErrors({ mismatch: true });
  }
}

// getting the form control elements
get password(): AbstractControl {
  return this.registrationForm.controls['password'];
}

get confirm_password(): AbstractControl {
  return this.registrationForm.controls['confirmpassword'];
}
}
