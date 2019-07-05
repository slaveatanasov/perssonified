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
  currentUser: any;
  tfaSetup: any;
  currentTFASettings: any;
  tfaEnableForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private TfaService: TfaService, private router: Router) {
    this.tfaEnableForm = fb.group({
      authcode: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      if (!this.currentUser.tfaEnabled) {
        this.showQRCode()
      } else {
        this.currentTFASettings = res.twoFactorSecret;
      }
    });
  }

  onSubmit() {
    this.TfaService.tfaEnableVerify({
      authCode: this.tfaEnableForm.value['authcode']
    }).subscribe();
    this.router.navigate['/dashboard'];
  }

  showQRCode() {
      this.TfaService.tfaEnable().subscribe(res => {
        this.tfaSetup = res;
      })
  }

  disableTFA() {
    this.TfaService.tfaDisable().subscribe();
    this.router.navigate['/dashboard'];
  }

}
