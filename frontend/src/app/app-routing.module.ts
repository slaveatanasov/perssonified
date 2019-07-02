import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { ContainerComponent } from './components/container/container.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TfaComponent } from './auth/tfa/tfa.component';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContainerComponent, canActivate: [JwtAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [JwtAuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent },
  { path: 'tfa', component: TfaComponent, canActivate: [JwtAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [JwtAuthGuard]
})

export class AppRoutingModule { }