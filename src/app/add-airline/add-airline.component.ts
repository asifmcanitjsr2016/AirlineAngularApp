import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FlightConfirmDialogComponent } from '../flight-confirm-dialog/flight-confirm-dialog.component';
import { Flights } from '../models/Flights';
import { AirlineService } from '../services/airline.service';
import { NotificationsService } from '../services/notifications.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';


@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  flightForm: any;
  minDate: any;
  maxDate: any;
  selectedIndex: number = 0;
  flag = false;
  isDataAvailable = false;
  displayedColumns = ['flightNumber',
    'airline', 'fromPlace', 'toPlace', 'totalBusinessClassSeat', 'totalNonBusinessClassSeat',
    'price', 'startDateTime', 'endDateTime', 'instrumentUsed', 'airlineStatus', 'meal', 'noOfRows', 'scheduledDays',
    'action'];
  dataSource!: MatTableDataSource<Flights>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  statustype = ['Open', 'Close'];
  onChangeData = 'Add Flight';
  mealtype = ['Veg', 'Non-Veg', 'None'];
  flightDetails: Flights = {
    flightNumber: '',
    airline: '',
    fromPlace: '',
    toPlace: '',
    totalBusinessClassSeat: 0,
    totalNonBusinessClassSeat: 0,
    price: 0,
    scheduledDays: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    instrumentUsed: '',
    airlineStatus: 'Open',
    noOfRows: 0,
    meal: ['None'],
    Discounts: [
      {
        CouponCode: '',
        Amount: 0,
        FlightDetailsFlightNumber: ''
      }
    ]
  };
  constructor(private _spinner: NgxSpinnerService,
    private _airlineService: AirlineService,
    private dialog: MatDialog,
    private _notification: NotificationsService) {

    this.flightForm = new FormGroup({
      flightNumber: new FormControl('', [Validators.required]),
      airline: new FormControl('', [Validators.required]),
      fromPlace: new FormControl('', [Validators.required]),
      toPlace: new FormControl('', [Validators.required]),
      totalBusinessClassSeat: new FormControl('', [Validators.required]),
      totalNonBusinessClassSeat: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      startDateTime: new FormControl('', [Validators.required]),
      endDateTime: new FormControl('', [Validators.required]),
      instrumentUsed: new FormControl('', [Validators.required]),
      airlineStatus: new FormControl('', [Validators.required]),
      meal: new FormControl('', [Validators.required]),
      noOfRows: new FormControl('', [Validators.required]),
      scheduledDays: new FormControl('', [Validators.required])
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    console.log(tab);
    if (tab === "Flight Details") {
      this.loadData();
      if (this.selectedIndex != 0) {
        this.flightForm.controls['flightNumber'].enable();
        this.flightForm.reset();
        this.resetForm();
        this.onChangeData = 'Add Flight';
        this.selectedIndex = this.selectedIndex - 1;
      }
      console.log(this.selectedIndex);
    }
  }

  nextStep(rowData: any) {
    if (this.selectedIndex != 2) {
      rowData.discounts = null;
      this.flightDetails = rowData;
      this.flightDetails.meal = this.flightDetails.meal.split(',');
      this.selectedIndex = this.selectedIndex + 1;
      this.flag = true;
      this.onChangeData = 'Update Flight';
      this.flightForm.controls['flightNumber'].disable();
    }
    console.log(this.selectedIndex);
  }

  deleteFlight(flightNumber: any) {

    let dialogRef = this.dialog.open(FlightConfirmDialogComponent, {
      data: { title: 'Delete Flight', details: 'Do you want to delete this flight?' },
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res.data) {
        this._spinner.show();

        this._airlineService.deleteFlight(flightNumber)
          .subscribe(
            data => {

              this._spinner.hide();
              if (data) {
                this.loadData();
                this.isDataAvailable = true;
                this._notification.successMessage({ responseType: 'Airline', message: 'Flight has been deleted successfully!' });
              }
              else {
                this._notification.errorMessage('Flight has not been deleted');
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
    });
  }
  loadData() {
    this._spinner.show();

    this._airlineService.getAllFlights()
      .subscribe(
        data => {

          this._spinner.hide();
          if (data == null || data.length == 0) {
            this._notification.infoMessage({ message: 'Airline', subText: 'No data available!' });
          }
          console.log("Observable Data:", data);
          this.isDataAvailable = true;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.loadData();
  }

  public resetForm() {
    this.flightForm.reset({
      airlineStatus: 'Open',
      meal: ['None']
    });
  }

  onSubmit(formDirective: FormGroupDirective) {

    if (this.flightForm.valid) {

      this._spinner.show();

      if (this.selectedIndex == 1 && this.flag) {
        this._airlineService.UpdateFlight(this.flightDetails)
          .subscribe(
            data => {

              this._spinner.hide();
              if (data) {
                formDirective.resetForm();
                this.flightForm.reset();
                this.resetForm();
                this.flag = false;
                this.onChangeData = "Add Flight";
                this.flightForm.controls['flightNumber'].enable();
                this._notification.successMessage({ responseType: 'Airline', message: 'Flight updated successfully!' });
              }
              else {
                this._notification.errorMessage('Flight not updated. Please check field values');
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
      else {
        this._airlineService.AddFlight(this.flightDetails)
          .subscribe(
            data => {

              this._spinner.hide();
              if (data) {
                formDirective.resetForm();
                this.flightForm.reset();
                this.resetForm();
                this._notification.successMessage({ responseType: 'Airline', message: 'Flight has been added successfully!' });
              }
              else {
                this._notification.errorMessage('Flight has not been added');
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
  }

}
