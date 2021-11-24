import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  /* This is used for stroe the user */
  user$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  constructor() { }

  /* This method used for upadte user */
  public updateUser() {
    this.user$.next(true);
  }
}
