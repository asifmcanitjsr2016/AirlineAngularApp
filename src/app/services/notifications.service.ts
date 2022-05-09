import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { SucessMessageComponent } from '../sucess-message/sucess-message.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _snackbar:MatSnackBar) { }

  errorMessage(message:any){
    this._snackbar.openFromComponent(ErrorMessageComponent, {
      duration: 5000,
      panelClass: 'errorSnackbar',
      horizontalPosition: 'end',
      data: message
    });
  }

  successMessage(messageData:any){
    this._snackbar.openFromComponent(SucessMessageComponent, {
          duration: 5000,
          panelClass: 'successSnackbar',
          horizontalPosition: 'end',
          data: messageData
        });
  }

  infoMessage(message:any){
    this._snackbar.openFromComponent(InfoMessageComponent, {
      duration: 5000,
      panelClass: 'infoSnackbar',
      horizontalPosition: 'end',
      data: message
    });
  }
}
