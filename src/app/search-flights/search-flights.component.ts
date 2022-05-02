import { Component, OnInit } from '@angular/core';
import { SearchFlightsModel } from '../models/SearchFlight';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import { BookingService } from '../services/booking.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FlightsDetails } from '../models/FlightsDetails';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
  minDate: any;
  maxDate: any;  
  returnDateDisabled = true;
  departDate!:Date;
  datetime!:Date;
  types:any;
  selectedItem:any;
  returnDate:any;
  dataSource!: FlightsDetails[];
  getData!:any;  
  displayedColumns!: string[];
  searchflight:SearchFlightsModel={
    fromPlace:"",
    toPlace:"",
    date:"",
    returnDate:"",
    classType:"",
    way:"one way"
  };

  constructor(private _spinner:NgxSpinnerService,
    private _bookingService:BookingService,
    private _snackbar:MatSnackBar
    ) {    
      
      this.displayedColumns = ['flightName', 'flightFrom', 'flightTo', 'flightPrice', 'book'];      
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 1, 11, 31);    
   }
   ngOnInit(): void {

    //this._spinner.show();

    // this.searchflight.classType='Business';
    // this.searchflight.date='2022-04-24';
    // //this.datetime=this.returnDate;
    // this.searchflight.returnDate='';
    // this.searchflight.fromPlace='Kolkata';
    // this.searchflight.toPlace='Banglore';
    // this.searchflight.way='one way';


    
    // this._bookingService.SearchFlights(this.searchflight)
    // .subscribe(
    //   data => {
    //     //location.reload();
    //     this._spinner.hide();
    //     this._snackbar.openFromComponent(SucessMessageComponent, {
    //       duration: 5000,
    //       panelClass: 'sucessSnackbar',
    //       horizontalPosition: 'end',
    //       data: "data successfully fetched"
    //     });
    //     console.log("Observable Data:",data);        
    //     this.dataSource=data;
    //   },
    //   err => {
    //     let errMessage = err;
    //     this._spinner.hide();
    //     console.log(errMessage);
    //     this._snackbar.openFromComponent(ErrorMessageComponent, {
    //       duration: 5000,
    //       panelClass: 'errorSnackbar',
    //       horizontalPosition: 'end',
    //       data: errMessage
    //     });
    //   });
    
    this.departDate=new Date();
    this.types = [
      "Economy",
      "Business"  
  ];  
  this.selectedItem="Economy";
  }

   toggle(){
    this.returnDateDisabled = !this.returnDateDisabled;
    if(this.returnDateDisabled){
      this.returnDate="";
    }
  }

  swapPlace(){
    let temp=this.searchflight.fromPlace;
    this.searchflight.fromPlace=this.searchflight.toPlace;
    this.searchflight.toPlace=temp;
  }
  getFlight(flightNumber:any){

  }
  onSubmit(data:any){
    this._spinner.show();

    this.searchflight.classType=this.selectedItem;
    this.searchflight.date=this.departDate?.toDateString()??'';
    this.datetime=this.returnDate;
    this.searchflight.returnDate=this.datetime?.toDateString()??'';
    
    this._bookingService.SearchFlights(this.searchflight)
    .subscribe(
      data => {
        //location.reload();
        this._spinner.hide();
        // this._snackbar.openFromComponent(SucessMessageComponent, {
        //   duration: 5000,
        //   panelClass: 'sucessSnackbar',
        //   horizontalPosition: 'end',
        //   data: "data successfully fetched"
        // });
        console.log("Observable Data:",data);
        this.dataSource=data;
      },
      err => {
        let errMessage = err;
        this._spinner.hide();
        console.log(errMessage);
        // this._snackbar.openFromComponent(ErrorMessageComponent, {
        //   duration: 5000,
        //   panelClass: 'errorSnackbar',
        //   horizontalPosition: 'end',
        //   data: errMessage
        // });
      });    
  }

}
