import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar'

@Component({
  selector: 'app-sucess-message',
  templateUrl: './sucess-message.component.html',
  styleUrls: ['./sucess-message.component.css']
})
export class SucessMessageComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SucessMessageComponent>, @Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
