import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
  tfaFlag: boolean = false;
  loginForm: FormGroup;
  tfaForm: FormGroup

  constructor(private authService: AuthService, fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.tfaForm = fb.group({
      token: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password'],
      tfaToken: this.tfaForm.value['token']
    }).subscribe(response => {
      if (response.status == 206) {
        this.tfaFlag = true;
        this.snackBar.open('Complete 2 step verification.', 'Close', {
          panelClass: 'login-snackbar',
          duration: 3000
        });
      }

      if (response.status == 401) {
        this.tfaFlag = true;
        this.snackBar.open('Invalid entry, please try again.', 'Close', {
          panelClass: 'login-snackbar',
          duration: 3000
        });
      }

      if (response.status === 200) {
        if (this.authService.authChange) {
          this.router.navigate(['/'])
          this.snackBar.open('Successful login.', 'Close', {
            panelClass: 'login-snackbar',
            duration: 3000
          });
        }
      }
    }, (error) => {
      const errorMessage = error.error.message;
      this.snackBar.open(errorMessage, 'Close', {
        panelClass: 'login-snackbar',
        duration: 5000
      });
    })
  }
}