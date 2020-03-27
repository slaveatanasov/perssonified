import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ContainerComponent } from './components/container/container.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

import { JwtAuthGuard } from './guards/jwtAuth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContainerComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [JwtAuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [JwtAuthGuard] },
  { path: 'tfa', component: SettingsComponent, canActivate: [JwtAuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [JwtAuthGuard]
})

export class AppRoutingModule {}