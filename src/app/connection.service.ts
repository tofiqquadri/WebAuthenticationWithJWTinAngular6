import { Injectable } from '@angular/core';
import { HttpRestClient } from './core/http.client';

@Injectable()
export class ConnectionService {

  private entity = '';

  constructor(
    private _httpClient: HttpRestClient
  ) { }

  read() {
    return this._httpClient.getData(this.entity);
  }

}
