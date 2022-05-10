import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Flights } from '../models/Flights';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private _http:HttpClient) { }

  AddFlight(flightData: Flights): Observable<any>{
    flightData.meal=flightData.meal.join();
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(flightData);

    return this._http.post<any>(environment.baseUrl[0] + '/airline/inventory/add', body, {'headers':headers})
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

  UpdateFlight(flightData: Flights): Observable<any>{

    flightData.meal=flightData.meal.join();
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(flightData);

    return this._http.put<any>(environment.baseUrl[0] + '/airline/inventory/update?flightnumber='+flightData.flightNumber, body, {'headers':headers})
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

  getAllFlights(): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}      

    return this._http.get<any>(environment.baseUrl[0] + '/airline', {'headers':headers})
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

  deleteFlight(flightNumber:any): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}      

    return this._http.delete<any>(environment.baseUrl[0] + '/airline/inventory/delete?flightNumber='+flightNumber, {'headers':headers})
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
