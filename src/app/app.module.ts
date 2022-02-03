import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatSignalrService } from './services/chat-signalr.service';
import { CustomersConnectedComponent } from './customers-connected/customers-connected.component';
import { SharedModule } from './shared/shared.module';
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomersConnectedComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [ChatSignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
