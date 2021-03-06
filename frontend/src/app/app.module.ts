import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { ApiKeyInterceptor } from './services/api-key.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContainerComponent } from './components/container/container.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TfaSettingsComponent } from './components/tfa-settings/tfa-settings.component';
import { DashboardInfoComponent } from './components/dashboard-info/dashboard-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContainerComponent,
    SignUpComponent,
    LogInComponent,
    DashboardComponent,
    SettingsComponent,
    TfaSettingsComponent,
    DashboardInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragScrollModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
