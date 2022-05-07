import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PassengerDetails } from '../models/PassengerDetails';
import { TicketHistory } from '../models/TicketHistory';
import { BookingService } from '../services/booking.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchFlightsComponent } from '../search-flights/search-flights.component';
@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

  passengerForm = this.fb.group({
    passengers: this.fb.array([])
  });

  passengers = [
    {
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      classType: ['', [Validators.required]],
      optForMeal: ['', [Validators.required]],
      seatNo: ['', [Validators.required]]
    }
  ];

  get passengersControl(): FormArray {
    return this.passengerForm.get("passengers") as FormArray;
  }

  alldata = new TicketHistory();
  constructor(@Inject(MAT_DIALOG_DATA) public ticketDetails: any,
    private _spinner: NgxSpinnerService,
    private _bookingService: BookingService,
    private _dialogRef: MatDialogRef<SearchFlightsComponent>, private fb: FormBuilder
  ) {


    // this.passengerForm = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   gender: new FormControl('', [Validators.required]),
    //   age: new FormControl('', [Validators.required]),
    //   classType: new FormControl('', [Validators.required]),
    //   optForMeal: new FormControl('', [Validators.required]),
    //   seatNo: new FormControl('', [Validators.required])      
    // });

  }

  add(index: number) {
    if (this.passengersControl.valid && this.passengersControl.length <= 4) {
      
      this.passengersControl.push(
        this.fb.group({
          name: ['', [Validators.required]],
          gender: ['', [Validators.required]],
          age: ['', [Validators.required]],
          classType: ['', [Validators.required]],
          optForMeal: ['', [Validators.required]],
          seatNo: ['', [Validators.required]]
        })
      );
    }
  }
  remove(index: number) {
    if (index != 0) {
      this.passengersControl.removeAt(index);
    }
  }

  onSubmit() {
    if (this.passengersControl.valid) {
      
      let storedData = sessionStorage.getItem('loginDetails');
      let item = storedData != null ? JSON.parse(storedData) : '{}';
      this.alldata.userID = item.userid;
      this.alldata.userName = item.username;
      this.alldata.doj = this.ticketDetails.journeyDate;
      this.alldata.flightNumber = this.ticketDetails.flightNumber;
      this.alldata.fromPlace = this.ticketDetails.fromPlace;
      this.alldata.toPlace = this.ticketDetails.toPlace;
      
      this.alldata.passengerDetails=this.passengersControl.value;
      
        console.log(this.alldata);
        this._bookingService.BookTicket(this.alldata).subscribe(
          data => {

            this._spinner.hide();
            this.passengerForm.reset();
            console.log("Observable Data:", data);
            this._dialogRef.close();

          },
          err => {
            let errMessage = err;
            this._spinner.hide();
            console.log(errMessage);

          });
      
    }

  }
  ngOnInit(): void {
    console.log(this.ticketDetails);    

    this.passengersControl.push(
      this.fb.group({
        name: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        age: ['', [Validators.required]],
        classType: ['', [Validators.required]],
        optForMeal: ['', [Validators.required]],
        seatNo: ['', [Validators.required]]
      })
    )
  }
}
