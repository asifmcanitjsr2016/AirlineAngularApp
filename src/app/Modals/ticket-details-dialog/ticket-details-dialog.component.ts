import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-details-dialog',
  templateUrl: './ticket-details-dialog.component.html',
  styleUrls: ['./ticket-details-dialog.component.css']
})
export class TicketDetailsDialogComponent implements OnInit {
displayedColumns = ['name', 'gender', 'age', 'classType', 'optForMeal', 'seatNo'];
dataSource!:any;  
constructor(@Inject(MAT_DIALOG_DATA) public ticketDetails:any) { }

  ngOnInit(): void {
    console.log(this.ticketDetails);
    this.dataSource=this.ticketDetails.passengerDetails;
  }

}
