import { Component, OnInit, Input, Output } from '@angular/core';

import { UserService } from '../../services/user.service';
import { TfaService } from '../../services/tfa.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService, private TfaService: TfaService, private router: Router) {
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
