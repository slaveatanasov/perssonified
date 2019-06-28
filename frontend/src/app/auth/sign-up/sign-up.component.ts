import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  returnUrl: string;

  constructor(private authService: AuthService, fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    }, { validator: this.checkPasswords('password', 'passwordConfirm') });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.registerUser({
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password'],
      passwordConfirm: this.registerForm.value['passwordConfirm']
    }).subscribe(() => {
      this.router.navigate(['/login']);
      this.snackBar.open('Successful registration.', 'Close', {
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

  checkPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmInput = group.controls[confirmPassword];
      if (passwordInput.value !== passwordConfirmInput.value) {
        return passwordConfirmInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmInput.setErrors(null);
      }
    }
  }

}
