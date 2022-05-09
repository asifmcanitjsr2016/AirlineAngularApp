import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { TicketDetails } from '../models/TicketDetails';
import { BookingService } from '../services/booking.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketDetailsDialogComponent } from '../Modals/ticket-details-dialog/ticket-details-dialog.component';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  isDataAvailable = false;
  isDataAvailable1 = false;
  inputValue = "";
  ticketDetails!: TicketDetails;
  ticketDetails1!: TicketDetails;
  dataSource!: MatTableDataSource<TicketDetails>;
  dataSource1!: MatTableDataSource<TicketDetails>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['pnrNumber', 'fromPlace', 'toPlace', 'doj', 'flightNumber', 'action'];
  displayedColumns1 = ['name', 'gender', 'age', 'optForMeal', 'seatNo'];

  constructor(private _spinner: NgxSpinnerService,
    private _bookingService: BookingService,
    private dialog: MatDialog,
    private _notification: NotificationsService
  ) { }

  ngOnInit(): void {
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
    if (tab === "Booking History") {
      this.loadData();
    }
  }

  viewDetails(ticket: any) {
    this.dialog.open(TicketDetailsDialogComponent, {
      data: ticket,
      width: '60%'
    });
  }

  cancelTicket(pnr: any) {
    this._spinner.show();

    this._bookingService.cancelTicket(pnr)
      .subscribe(
        data => {
          this._spinner.hide();
          if (data) {
            this.loadData();
            this._notification.infoMessage({ message: 'Ticket', subText: 'Ticket has been canceled successfully!' });
          }
          else {
            this._notification.errorMessage('Ticket has not been canceled');
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
  searchTicket(pnr: any) {
    this._bookingService.getTicketByPnr(pnr)
      .subscribe(
        data => {
          this._spinner.hide();
          if (data != null) {
            this.ticketDetails1 = data;
            console.log("Observable Data:", data);
            this.isDataAvailable1 = true;
            this.dataSource1 = new MatTableDataSource(data.passengerDetails);
          }
          else {
            this.isDataAvailable1 = false;
            this._notification.infoMessage({ message: 'Ticket', subText: 'No data available for this pnr' });
          }
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
  }

  loadData() {
    this._spinner.show();

    let storedData = sessionStorage.getItem('loginDetails');
    let item = storedData != null ? JSON.parse(storedData) : '{}';
    this._bookingService.getAllTickets(item.userid)
      .subscribe(
        data => {

          this._spinner.hide();
          if (data == null || data.length == 0) {
            this._notification.infoMessage({ message: 'Ticket', subText: 'No data available for this user' });
          }
          this.isDataAvailable = true;
          this.ticketDetails = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;

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
