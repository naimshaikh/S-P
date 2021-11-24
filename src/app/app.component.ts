import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Semcom';
  
  /* This variable user for show or not */
  isShowHeader = false;

  constructor(private router: Router) {

  }

  /* This method used for show header or not  */
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {      
      this.isShowHeader = localStorage.getItem('user') && event.url !== '/login' ? true : false;
    });
  }
}
