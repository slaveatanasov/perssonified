import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
// import { DragScrollModule } from 'ngx-drag-scroll';
// import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { NguCarouselModule } from '@ngu/carousel';

import { ApiKeyInterceptor } from './services/api-key.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ContainerComponent } from './components/container/container.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TfaSettingsComponent } from './components/tfa-settings/tfa-settings.component';
import { DashboardInfoComponent } from './components/dashboard-info/dashboard-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
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
    // DragScrollModule,
    // SwiperModule,
    NguCarouselModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, 
    // { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG },
     AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
