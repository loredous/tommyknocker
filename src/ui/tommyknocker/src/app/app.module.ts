import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import { ClarityIcons, shieldCheckIcon, angleIcon, cogIcon } from '@cds/core/icon';
import { ApiModule } from './api/api.module';

ClarityIcons.addIcons(shieldCheckIcon, angleIcon, cogIcon);

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ClarityModule, ApiModule.forRoot({rootUrl: 'http://localhost:8000/api/v1'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
