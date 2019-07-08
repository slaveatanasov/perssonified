import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService, private fb: FormBuilder, private TfaService: TfaService, private router: Router) {
  }

  ngOnInit() {
    // this.userService.getCurrentUser().subscribe(res => {
    //   this.currentUser = res;
    //   if (!this.currentUser.tfaEnabled) {
    //     this.showQRCode()
    //   } else {
    //     this.currentTFASettings = res.twoFactorSecret;
    //   }
    // });
  }

}
