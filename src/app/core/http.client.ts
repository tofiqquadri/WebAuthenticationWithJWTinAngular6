import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { ResponseContentType } from '@angular/http';

@Injectable()
export class HttpRestClient {

  constructor(
    private http: HttpClient) {
  }

  // CHANGE THIS URL TO YOUR WEBSOCKET URL
  private apiEndpoint = 'ws://34.247.106.82:8100';

  // CHANGE THIS TOKEN TO YOUR JWT TOKEN
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI4MTlkYzF' +
    'kYi04OGM0LTQ4NzAtYmE3ZC0yOTRiOGM5MjBkZGYiLCJwZXJmaWwiOiJVU0VSIiwiaXNMaW1pdGVkQWNj' +
    'ZXNzIjpmYWxzZSwiaWF0IjoxNTQxOTM4Njc3fQ.AXCEL05gDBNrfwlOsOrLh7gkWP8D2tOrHUnF0A2T-PY';

  createAuthorizationHeader(headers: HttpHeaders) {

    // USE ANY OF THESE PARAMETERS AT YOUR SERVER END TO PARSE THE TOKEN
    // YOU ARE FREE TO REMOVE ANY OF THE PARAMETER WHICH YOU DON'T NEED
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('Authentication', 'Bearer ' + this.token);
    headers.append('token', 'Bearer ' + this.token);
  }

  createBasicAuthorizationHeader(headers: HttpHeaders, username: string, password: string) {
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  }

  getApiUrl(route: String): string {
    return this.apiEndpoint;
  }

  getData(url: String) {

    const authHeaders = new HttpHeaders();
    this.createAuthorizationHeader(authHeaders);

    // console.log('From getData Authorization : ' + authHeaders.get('Authorization'));
    return this.http.get(this.getApiUrl(url), {
      headers: authHeaders,
      withCredentials: true
    }).pipe(map(res => {
      // CHECK THE ERROR TYPE
      this.processHttpCode(res);
      return res;
    }), catchError(res => {
      this.processHttpCode(res);
      return throwError(res);
    }));
  }

  processHttpCode(response: any) {

    // ADD THE FUNCTIONALITIES TO EACH CHECK AS PER YOUR REQUIREMENTS
    if (response.status === 200) {
      if (response._body.reloadContext === true) {
        console.log('Success');
      }
    }

    if (response.status === 0) {

    }

    // UNAUTHORIZED REQUEST PROCESSED
    if (response.status === 401) {
      console.log('Unauthorized');
    }

    if (response.status === 403) {
    }

  }

}
