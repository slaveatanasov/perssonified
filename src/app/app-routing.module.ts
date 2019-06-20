import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { ContainerComponent } from './components/container/container.component'

const routes: Routes = [
    { path: '', pathMatch: 'full', component: ContainerComponent},
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LogInComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}