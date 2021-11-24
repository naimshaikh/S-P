import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /* this variable used for from */
  public profileForm: FormGroup;

  /* This used for closed the dialog */
 public closeDialog: boolean = false;

  constructor(private fb: FormBuilder,
  private communicationService:CommunicationService) {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required]],
      email:['']
    })
   }

     // convenience getter for easy access to form fields
     get formControl() { return this.profileForm.controls; }

  /* Get the current uses from the loacl storage */
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let user: any = localStorage.getItem('user');
      this.profileForm.get('email')?.patchValue(JSON.parse(user).email);
      this.profileForm.get('userName')?.patchValue(JSON.parse(user).userName);
    }
  }
  
  /* This method used for chnage the current user name */
  public onSubmit(): void {   
    let user: any = localStorage.getItem('user');
    let newUser = JSON.parse(user);
    newUser.userName = this.profileForm.get('userName')?.value;
    localStorage.setItem('user', JSON.stringify(newUser));
    this.communicationService.updateUser();
    this.closeDialog = true;
  }
}
