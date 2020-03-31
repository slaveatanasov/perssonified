import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { UserService } from '../../services/user.service';
import { TfaService } from '../../services/tfa.service';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User;
  editableUsername: boolean = false;
  editableEmail: boolean = false;

  constructor(private userService: UserService, private TfaService: TfaService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required]]
    })
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.userForm = this.fb.group({
        username: [this.currentUser.username, [Validators.required]],
        email: [this.currentUser.email, [Validators.required]]
      });
    });

  }

  toggleEditableUsername() {
    this.editableUsername = !this.editableUsername;
  }

  toggleEditableEmail() {
    this.editableEmail = !this.editableEmail;
  }

  updateUser(valueClicked: string) {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value.username, this.userForm.value.email).subscribe(res => {
        if (res.updated) {
          if (valueClicked === 'Username') {
            this.toggleEditableUsername();
          }
          if (valueClicked === 'Email') {
            this.toggleEditableEmail();
          }
          this.snackBar.open(`${valueClicked} updated successfully.`, 'Close', {
            panelClass: 'login-snackbar',
            duration: 5000
          });
        } else {
          this.snackBar.open('User info remains unchanged.', 'Close', {
            panelClass: 'login-snackbar',
            duration: 5000
          });
        }
      });
    }
  }

  cancelUpdate() {
    this.userForm.reset(
      this.userForm = this.fb.group({
        username: [this.currentUser.username, [Validators.required]],
        email: [this.currentUser.email, [Validators.required]]
      })
    );
  }

  tfaEnableVerify(authCode) {
    this.TfaService.tfaEnableVerify({
      authCode
    }).subscribe(() => {
      this.router.navigate['/dashboard'];
    });
  }

  tfaDisable() {
    this.TfaService.tfaDisable().subscribe();
    this.router.navigate['/dashboard'];
  }

}
