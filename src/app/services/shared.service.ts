import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public emitter: Subject<string> = new Subject<string>();
 
  getEmittedValue() {
    return this.emitter;
  }
}
