import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RawDataComponent} from './components/rawdata/rawdata.component';
import {StatusComponent} from './components/status/status.component';

import {StompConfig, StompService, InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { HttpRestClient } from './core/http.client';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI4MTlkYzF' +
'kYi04OGM0LTQ4NzAtYmE3ZC0yOTRiOGM5MjBkZGYiLCJwZXJmaWwiOiJVU0VSIiwiaXNMaW1pdGVkQWNj' +
'ZXNzIjpmYWxzZSwiaWF0IjoxNTQxOTM4Njc3fQ.AXCEL05gDBNrfwlOsOrLh7gkWP8D2tOrHUnF0A2T-PY';

export const stompConfig: InjectableRxStompConfig  = {
  // Which server?
  brokerURL: 'ws://34.247.106.82:8100',

  // Headers
  // Typical keys: login, passcode, host
  // connectHeaders: {
  //   Auth : 'Bearer ' + token
  // },
  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 200000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnectDelay: 10000,

  // Will log diagnostics on console
  // debug: true
  debug: (str) => {
        console.log(str);
      }
};


@NgModule({
  declarations: [
    AppComponent,
    RawDataComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    // StompService,
    CookieService,
    RxStompService,
    HttpRestClient,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
