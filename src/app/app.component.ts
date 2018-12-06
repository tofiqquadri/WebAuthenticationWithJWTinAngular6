import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { stompConfig } from './app.module';
import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { ConnectionService } from './connection.service';

// DEPENDENCY TO SET COOKIES: TO PASS JWT TOKEN
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConnectionService]
})

export class AppComponent implements OnInit {

  foo$;
  bar;

  constructor(private rxStompService: RxStompService,
    private cookieService: CookieService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit() {
    // create an empty headers object
    const headers = {};

    // get the CSRF from the store
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI4MTlkYzF' +
      'kYi04OGM0LTQ4NzAtYmE3ZC0yOTRiOGM5MjBkZGYiLCJwZXJmaWwiOiJVU0VSIiwiaXNMaW1pdGVkQWNj' +
      'ZXNzIjpmYWxzZSwiaWF0IjoxNTQxOTM4Njc3fQ.AXCEL05gDBNrfwlOsOrLh7gkWP8D2tOrHUnF0A2T-PY';

    // make that CSRF token look like a real header
    headers['Authentication'] = 'Bearer ' + token;
    headers['token'] = 'Bearer ' + token;

    // MAIN CORE CONCEPT OF SETTING JWT TOKEN WITH COOKIES IS DONE HERE
    this.cookieService.set('Authorization', 'Bearer ' + token);
    this.cookieService.set('token', 'Bearer ' + token);

    // put the CSRF header into the connectHeaders on the config
    const config: InjectableRxStompConfig = { ...stompConfig, connectHeaders: headers };

    // configure the actual websocket service
    this.rxStompService.configure(config);
    this.rxStompService.activate();

    // start a websocket connection
    this.foo$ = this.rxStompService.watch('/').pipe(
      // tap((message: Message) => {
      //     this.bar = message.body;
      // })
    );

    this.connect();

  }

  connect() {
    this.connectionService.read().subscribe((httpResponse) => {
      console.log(httpResponse);
    });
  }
}
