import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirlineDetailsComponent } from '../airline-details/airline-details.component';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  
  private _dialogRef: MatDialogRef<BookingComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this._dialogRef.close({data:false});
  }

  confirm(){
    this._dialogRef.close({data:true});
  }
}
