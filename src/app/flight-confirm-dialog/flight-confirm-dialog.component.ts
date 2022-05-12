import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddAirlineComponent } from '../add-airline/add-airline.component';

@Component({
  selector: 'app-flight-confirm-dialog',
  templateUrl: './flight-confirm-dialog.component.html',
  styleUrls: ['./flight-confirm-dialog.component.css']
})
export class FlightConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  
  private _dialogRef: MatDialogRef<AddAirlineComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this._dialogRef.close({data:false});
  }

  confirm(){
    this._dialogRef.close({data:true});
  }

}
