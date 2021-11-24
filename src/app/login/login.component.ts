import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  viewProviders:[LoginService]
})
export class LoginComponent implements OnInit {

  /* This variable used for form */
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(50)]],
      password: ['', [Validators.required]],
      termsAndCondition:[false,Validators.requiredTrue]
    })
   }

  ngOnInit(): void {
  }

    // convenience getter for easy access to form fields
    get formControl() { return this.loginForm.controls; }

/* This method used for check box check or not if check then dialog is open */
  public onCheck(e:any) {
    if (e.target.checked) {
      this.openDialog();
    }   
  }
/**
 * This Method used for open dialog box 
 */
 public openDialog() {
    const dialogRef = this.dialog.open(TermsConditionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /**
   * This method used for login purpose
   */
 public onLogin(): void {
    if (this.loginService.checkUser(this.loginForm.value)) {
      this.toastr.success('Login successfully!');
      this.router.navigate(['home']);
    } else {
      this.toastr.error('Please enter valid Email and Password');
    };
  }
}
