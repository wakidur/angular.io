import { Injectable } from '@angular/core';

import { AuthModule } from "./auth.module";

import { UserService } from "../core/user.service";
import { SessionStorageService } from "../core/session-storage.service";
import { LocalStorageService } from '../core/local-storage.service';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {
  private storageKey = "session";
  public cachedRequests: Array<HttpRequest<any>> = [];
  constructor(
    private userSevice: UserService,
    private storage: SessionStorageService,
    private localStorageService: LocalStorageService,
     ) {}


      /**
   * setToken
   */
  public setToken(token) {
    this.storage.setToken(this.storageKey, token);
  }

  /**
   * getToken
   */
  public getToken() {
    return this.storage.getItem(this.storageKey);
  }

  /**
   * deleteToken
   */
  public deleteToken() {
    this.storage.removeItem(this.storageKey);
  }

  /**
   * getUserPayload
   */
  public getUserPayload() {
    // get the token
    const token = this.getToken();
    if (token) {
      const userPayload = atob((token as string).split(".")[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  /**
   * isLoggedIn
   */
  public isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  /**
   * collectFailedRequest
   */
  public collectFailedRequest(req): void {
    this.cachedRequests.push(req);
  }

  /**
   * retryFailedRequests
   */
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  /**
   * authentication
   */
  public authentication() {

  }


}
