// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms'
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent implements OnInit {

//   constructor(private authService: AuthService) { }

//   ngOnInit() {
//   }

//   onSubmit(form: NgForm) {
//     this.authService.registerUser({
//       email: form.value.email,
//       password: form.value.password
//     })
//   }

// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, fb: FormBuilder) {
    this.registerForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    }, {validator: this.checkPasswords('password', 'passwordConfirm')})
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password']
    })
  }

  checkPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
     let passwordInput = group.controls[password],
         passwordConfirmInput = group.controls[confirmPassword];
     if (passwordInput.value !== passwordConfirmInput.value) {
       return passwordConfirmInput.setErrors({notEquivalent: true})
     }
     else {
        return passwordConfirmInput.setErrors(null);
     }
   }
  }

}
