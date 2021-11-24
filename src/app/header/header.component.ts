import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** Used for email */
  userEmail: string;
  /** Used for user name */
  userName: string;

  constructor(private router: Router, public dialog: MatDialog,
  private communicationService: CommunicationService) {
    this.userEmail = '';
    this.userName = '';
   }

   /** Get the user name and show in header */
 public ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let user: any = localStorage.getItem('user');
      this.userEmail = JSON.parse(user).email;
      this.userName = JSON.parse(user).userName
    }
    /** This service used for update the user name */
    this.communicationService.user$.subscribe((update: boolean) => {
      if (update) {
        let user: any = localStorage.getItem('user');
      this.userEmail = JSON.parse(user).email;
        this.userName = JSON.parse(user).userName;
      }
    })
  }

  /** This method used for logout to the current page and back to the login page */
  public logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  /** This method used for profile dialog */
  public openProfile() {
    const dialogRef = this.dialog.open(UserProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
