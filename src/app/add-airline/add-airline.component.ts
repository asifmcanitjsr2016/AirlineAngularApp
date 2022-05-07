import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Flights } from '../models/Flights';
import { AirlineService } from '../services/airline.service';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';


@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  flightForm: any;
  selectedIndex: number = 0;
  flag=false;
  isDataAvailable=false;
  displayedColumns = ['flightNumber',
      'airline', 'fromPlace', 'toPlace', 'totalBusinessClassSeat','totalNonBusinessClassSeat',
      'price','startDateTime','endDateTime','instrumentUsed','airlineStatus','meal','noOfRows','scheduledDays',
       'action'];      
  dataSource!: MatTableDataSource<Flights>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  statustype=['Open','Close'];
  onChangeData='Add Flight';
  mealtype=['Veg','Non-Veg','None'];
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
  constructor(private _spinner:NgxSpinnerService,
    private _airlineService:AirlineService,
    private _snackbar:MatSnackBar) {      

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
      noOfRows: new FormControl('',[Validators.required]),
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
    if(tab==="Flight Details")
     {      
      this.loadData();
      if (this.selectedIndex != 0) {
        this.flightForm.controls['flightNumber'].enable();
        this.flightForm.reset();
        this.resetForm();
        this.onChangeData='Add Flight';
        this.selectedIndex = this.selectedIndex - 1;
      }
      console.log(this.selectedIndex);
     }
  }

  nextStep(rowData:any){
    if (this.selectedIndex != 2) {    
      rowData.discounts=null;  
      this.flightDetails=rowData;
      this.flightDetails.meal=this.flightDetails.meal.split(',');
      this.selectedIndex = this.selectedIndex + 1;
      this.flag=true;      
      this.onChangeData='Update Flight';
      this.flightForm.controls['flightNumber'].disable();       
    }
    console.log(this.selectedIndex);
  }

  deleteFlight(flightNumber:any){
    this._spinner.show();    
    
      this._airlineService.deleteFlight(flightNumber)
      .subscribe(
        data => {
          
          this._spinner.hide();
          this.loadData();
          console.log("Observable Data:",data);
          this.isDataAvailable=true;          
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          
        });
  }

  loadData(){
    this._spinner.show();    
    
      this._airlineService.getAllFlights()
      .subscribe(
        data => {
          
          this._spinner.hide();
          
          console.log("Observable Data:",data);
          this.isDataAvailable=true;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          
        });
  }
  ngOnInit(): void {      
    this.loadData();  
  }

  public resetForm(){
  this.flightForm.reset({    
    airlineStatus:'Open',
    meal:['None']    
   });
}

  onSubmit(formDirective:FormGroupDirective){
        
    if (this.flightForm.valid) {

      this._spinner.show();               

      if(this.selectedIndex==1 && this.flag){
        this._airlineService.UpdateFlight(this.flightDetails)
      .subscribe(
      data => {

        formDirective.resetForm();
        this.flightForm.reset();            
        this.resetForm();
        this.flag=false;
        this.onChangeData="Add Flight";
        this.flightForm.controls['flightNumber'].enable();
        this._spinner.hide();
        this._snackbar.openFromComponent(SucessMessageComponent, {
          duration: 5000,
          panelClass: 'sucessSnackbar',
          horizontalPosition: 'end',
          data: "Registration Successful!"
        });
        console.log("Observable Data:",data);        
        
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
else{
      this._airlineService.AddFlight(this.flightDetails)
      .subscribe(
      data => {

        formDirective.resetForm();
        this.flightForm.reset();            
        this.resetForm();
        this._spinner.hide();
        this._snackbar.openFromComponent(SucessMessageComponent, {
          duration: 5000,
          panelClass: 'sucessSnackbar',
          horizontalPosition: 'end',
          data: "Registration Successful!"
        });
        console.log("Observable Data:",data);        
        
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
    
}
