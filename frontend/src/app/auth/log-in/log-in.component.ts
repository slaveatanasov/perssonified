import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

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
    }).subscribe(() => {
      this.router.navigate(['/dashboard'])
      this.snackBar.open('Successful login.', 'Close', {
        panelClass: 'login-snackbar',
        duration: 3000
      })
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