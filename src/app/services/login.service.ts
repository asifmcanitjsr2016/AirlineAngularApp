import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';
import { Register } from '../models/Register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  LoginUser(loginInfo: Login): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(loginInfo);

    return this._http.post<any>(environment.baseUrl + '/admin/login', body, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }
  RegisterUser(userInfo: Register): Observable<boolean>{
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(userInfo);

    return this._http.post<boolean>(environment.baseUrl + '/airline/register', body, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }
}
