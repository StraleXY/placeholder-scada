import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { TrendingPageComponent } from './trending/trending-page/trending-page.component';
import { AnalogInputComponent } from './trending/analog-input/analog-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrendingPageComponent,
    AnalogInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
