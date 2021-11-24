import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {

  /** This url for user list */
  baseUrl:string = 'https://reqres.in/api/'
  constructor(private http: HttpClient) { }

  /** This method used for get the user list */
  public getUsersList(): Observable<any>{
    const url = this.baseUrl + 'users';
    return this.http.get(url);
  }
}
