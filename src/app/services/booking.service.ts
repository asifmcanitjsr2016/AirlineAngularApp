import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchFlightsModel } from '../models/SearchFlight';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FlightsDetails } from '../models/FlightsDetails';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _http:HttpClient) { 
    
  }

  SearchFlights(searchData: SearchFlightsModel): Observable<FlightsDetails[]>{
    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(searchData);

    return this._http.post<FlightsDetails[]>(environment.baseUrl + '/search', body, {'headers':headers})
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
