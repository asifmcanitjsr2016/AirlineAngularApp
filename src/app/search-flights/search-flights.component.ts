import { Component, OnInit } from '@angular/core';
import { SearchFlightsModel } from '../models/SearchFlight';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookingService } from '../services/booking.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FlightsDetails } from '../models/FlightsDetails';
import { MatDialog } from '@angular/material/dialog';
import { AirlineDetailsComponent } from '../airline-details/airline-details.component';
import { AuthService } from '../Shared/auth.service';
import { Router } from '@angular/router';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
  minDate: any;
  maxDate: any;
  returnDateDisabled = true;
  departDate!: Date;
  datetime!: Date;
  types: any;
  totalBookedSeat!: number;
  selectedItem: any;
  returnDate: any;
  dataSource!: FlightsDetails[];
  getData!: any;
  isDataAvailable = false;
  displayedColumns!: string[];
  searchflight: SearchFlightsModel = {
    fromPlace: "",
    toPlace: "",
    date: "",
    returnDate: "",
    classType: "",
    way: "one way"
  };

  constructor(private _spinner: NgxSpinnerService,
    private _bookingService: BookingService,
    private _auth: AuthService,
    private route: Router,
    private dialog: MatDialog,
    private _notification: NotificationsService
  ) {

    this.displayedColumns = ['flightName', 'flightFrom', 'flightTo', 'flightPrice', 'action'];
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }
  ngOnInit(): void {
    this.totalBookedSeat = 0;
    this.departDate = new Date();
    this.types = [
      "Economy",
      "Business"
    ];
    this.selectedItem = "Economy";
  }

  toggle() {
    this.returnDateDisabled = !this.returnDateDisabled;
    if (this.returnDateDisabled) {
      this.returnDate = null;
    }
  }

  swapPlace() {
    let temp = this.searchflight.fromPlace;
    this.searchflight.fromPlace = this.searchflight.toPlace;
    this.searchflight.toPlace = temp;
  }
  viewDetails(bookingDetails: any) {
    if (this._auth.isUserLoggedIn()) {

      

      bookingDetails.classType = this.selectedItem;
      let dialogRef = this.dialog.open(AirlineDetailsComponent, {
        data: bookingDetails,
        width: '60%'
      });
      dialogRef.afterClosed().subscribe(res => {
        console.log(res.data);
        if (res.data || res.data == 0) {
          this.totalBookedSeat = res.data;
          this.updateAvailability(res.data,bookingDetails.flightNumber);
        }

      });
    }
    else {
      this._notification.infoMessage({ message: 'Login', subText: 'You are not Logged In' });
      this.route.navigate(['login']);
    }

  }

updateAvailability(totalBookedTicket:any, flightNumber:any){
  let objIndex = this.dataSource.findIndex((obj => obj.flightNumber == flightNumber));
      console.log("Before update: ", this.dataSource[objIndex])

      
      //Update Total Availability property.
      this.dataSource[objIndex].totalAvaiability = this.dataSource[objIndex].totalAvaiability - totalBookedTicket;

      //Log object to console again.
      console.log("After update: ", this.dataSource[objIndex])
}

  onSubmit(data: any) {
    this._spinner.show();

    this.searchflight.classType = this.selectedItem;
    this.searchflight.date = this.departDate?.toDateString() ?? '';
    this.datetime = this.returnDate;
    this.searchflight.returnDate = this.datetime?.toDateString() ?? '';

    this._bookingService.SearchFlights(this.searchflight)
      .subscribe(
        data => {
          //location.reload();
          this._spinner.hide();
          if (data == null || data.length == 0) {
            this.isDataAvailable = false;
            this._notification.infoMessage({ message: 'Flight', subText: 'No record found!' });
          }
          else {
            this.totalBookedSeat = 0;
            this.isDataAvailable = true;
            this.dataSource = data;
          }
          console.log("Observable Data:", data);
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
  }

}
