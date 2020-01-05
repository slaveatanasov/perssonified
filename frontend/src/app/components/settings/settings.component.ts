import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { UserService } from '../../services/user.service';
import { TfaService } from '../../services/tfa.service';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup;
  currentUser: any;

  constructor(private userService: UserService, private TfaService: TfaService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.userForm = fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      console.log(this.currentUser);
      this.userForm = this.fb.group({
        username: [this.currentUser.username, [Validators.required]],
        email: [this.currentUser.email, [Validators.required]]
      });
    });

  }

  updateUser() {
    console.log('updated')
    console.log(this.userForm.value);
    this.snackBar.open('User updated successfully.', 'Close', {
      panelClass: 'login-snackbar',
      duration: 5000
    });
  }

  cancelUpdate() {
    console.log('canceled')
    this.userForm.reset(
      this.userForm = this.fb.group({
        username: [this.currentUser.username, [Validators.required]],
        email: [this.currentUser.email, [Validators.required]]
      })
    );
  }
  
  tfaEnableVerify(authCode) {
    console.log(authCode);
    this.TfaService.tfaEnableVerify({
      authCode
    }).subscribe(res => {
      console.log(res);
    });
    this.router.navigate['/dashboard'];
  }

  tfaDisable() {
    this.TfaService.tfaDisable().subscribe();
    this.router.navigate['/dashboard'];
  }

}
