import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { UserService } from '../../services/user.service';
import { TfaService } from '../../services/tfa.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userUpdateForm: FormGroup;
  currentUser: any;

  constructor(private userService: UserService, private TfaService: TfaService, private fb: FormBuilder, private router: Router) {

    // console.log(this.currentUser);
    // this.userUpdateForm = fb.group({
    //   username: ["", [Validators.required]],
    //   email: ["", [Validators.required]]
    // })
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      if (this.currentUser) {
        console.log(this.currentUser)
        this.userUpdateForm.email.setValue(this.currentUser.)
      } else {
       console.log('asdasd')
      }
    });

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

}
