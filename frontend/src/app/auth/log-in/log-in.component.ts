import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password']
    })
    .subscribe((response) => {
      console.log('in login component')
       console.log(response);
       if (response.tfaRedirect !== undefined && response.tfaRedirect === true) {
         console.log('in login componen in IF that redirects to tfa challengs')
        this.router.navigateByUrl(`/tfa-challenge?tempId=${response.tempId}&userId=${response.userId}`);
       } else {
         if (this.authService.authChange) {
          console.log('in login component which redirects to dashboard')
          this.router.navigate(['/dashboard'])
          this.snackBar.open('Successful login.', 'Close', {
            panelClass: 'login-snackbar',
            duration: 3000
          })
         }
       }
       }, (error) => {
      const errorMessage = error.error.message;
      this.snackBar.open(errorMessage, 'Close', {
        panelClass: 'login-snackbar',
        duration: 5000
      });
    }
    )
  }

}