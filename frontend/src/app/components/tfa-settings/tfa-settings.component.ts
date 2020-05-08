import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { TfaService } from '../../services/tfa.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tfa-settings',
  templateUrl: './tfa-settings.component.html',
  styleUrls: ['./tfa-settings.component.scss']
})
export class TfaSettingsComponent implements OnInit {
  currentUser: any;
  tfaSetup: any;
  tfaEnableForm: FormGroup;

  @Output()
  tfaFormValue = new EventEmitter<any>();

  constructor(private userService: UserService, private fb: FormBuilder, private TfaService: TfaService, private router: Router) {
    this.tfaEnableForm = this.fb.group({
      authCode: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(curUser => {
      this.currentUser = curUser;
      if (!this.currentUser.tfaEnabled) {
        this.showTfaSetup()
      }
    });
    this.tfaFormValue.emit(this.tfaEnableForm.value['authCode']);
  }

  showTfaSetup() {
      this.TfaService.tfaEnable().subscribe(res => {
        this.tfaSetup = res;
      })
  }

  disableTFA() {
    this.TfaService.tfaDisable().subscribe();
    this.router.navigate['/dashboard'];
  }

}
