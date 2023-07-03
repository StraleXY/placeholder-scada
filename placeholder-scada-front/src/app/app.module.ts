import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { TrendingPageComponent } from './trending/trending-page/trending-page.component';
import { AnalogInputComponent } from './trending/analog-input/analog-input.component';
import { AlarmComponent } from './trending/alarm/alarm.component';
import { DigitalInputComponent } from './trending/digital-input/digital-input.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminInputsComponent } from './admin/admin-inputs/admin-inputs.component';
import { AdminOutputsComponent } from './admin/admin-outputs/admin-outputs.component';
import { AnalogInputInfoComponent } from './admin/analog-input-info/analog-input-info.component';
import { DigitalInputInfoComponent } from './admin/digital-input-info/digital-input-info.component';
import { SelectComponent } from './components/select/select.component';
import { AnalogOutputInfoComponent } from './admin/analog-output-info/analog-output-info.component';
import { DigitalOutputInfoComponent } from './admin/digital-output-info/digital-output-info.component';
import { RtuComponent } from './admin/rtu/rtu.component';
import { RegisterComponent } from './app/register/register.component';
import { ReportsComponent } from './app/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrendingPageComponent,
    AnalogInputComponent,
    AlarmComponent,
    DigitalInputComponent,
    AdminPageComponent,
    AdminInputsComponent,
    AdminOutputsComponent,
    AnalogInputInfoComponent,
    DigitalInputInfoComponent,
    SelectComponent,
    AnalogOutputInfoComponent,
    DigitalOutputInfoComponent,
    RtuComponent,
    RegisterComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
