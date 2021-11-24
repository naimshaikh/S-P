import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from './home.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  viewProviders:[HomeService]
})
export class HomeComponent implements OnInit,AfterViewInit {

  /** This variable used for store the user list */
 public usersList: any[];

  /** Used for dispaly column name */
 public displayedColumns: string[] = ['profile', 'firstName', 'lastName', 'email'];

 /** Used for the user data */
 public dataSource = new MatTableDataSource<any>();
 
  /** Used for paginator */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private homeService:HomeService) {
    this.usersList = [];
    this.homeService.getUsersList().subscribe((users: any) => {
      console.log(users);
      this.usersList = users.data;
      this.dataSource = new MatTableDataSource<any>(this.usersList);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  ngOnInit(): void {
  }

  /** Show the paginator */
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
