import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss']
})
export class DashboardInfoComponent implements OnInit {
  currentUser: any;
  loading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getCurrentUser().subscribe(res => {
      console.log(res);
      this.currentUser = res;
      this.loading = false;
    });
  }

}
