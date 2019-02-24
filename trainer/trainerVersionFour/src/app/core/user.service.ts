/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Http, Response } from "@angular/http";
import { Observable, of, throwError, forkJoin } from "rxjs";
import { catchError, map, throwIfEmpty } from "rxjs/operators";
/**
 * Application dependency
 */
import { CoreModule } from "./core.module";
import { User, Login } from "../core/model/user.model";
import { SessionStorageService } from "../core/session-storage.service";

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  // Class member variable
  private storageKey = "session";
  users: Array<User> = [];
  user: User;
  collectionsUrl = "https://api.mlab.com/api/1/databases/training/collections";
  apiKey = "TRZfI48FK_XQeAyB5EE5-7z3d8wFgcgV";
  params = "?apiKey=" + this.apiKey;
  private contactsUrlPort = "http://localhost:3000/api/users";

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  constructor(
    public httpClient: HttpClient,
    private storage: SessionStorageService
  ) {}

  // get("/api/users/account")

  /**
   * getUsers
   */
  // public getAllUserByObservable(): Observable<User[]> {
  //   return this.httpClient
  //     .get<User[]>( this.contactsUrlPort + "/account")
  //     .pipe(catchError(this.handleError("getExercise", [])));
  // }
  getAllUserByObservable(): Observable<User[]> {
    return this.httpClient.get(this.contactsUrlPort + "/account").pipe(
      map((res: Response) => <User[]>res.json()),
      catchError(this.handleError)
    );
  }

  /**
   * Ceate User
   */
  public createUser(user: User): Observable<User> {
    // let body = JSON.stringify({ name });
    // let headers = new Headers({ "Content-Type": "application/json" });
    // let options = new RequestOptions({ headers: headers });

    return this.httpClient
      .post(this.contactsUrlPort + "/signup", user, this.noAuthHeader)
      .pipe(
        map(response => response as User),
        catchError(this.handleError)
      );
  }

  /**
   * POST /login
   * Sign in using email and password.
   */

  logInUser(user: Login) {
    // let body = JSON.stringify({ name });
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.contactsUrlPort + "/login", body, options)
    //   .map(this.handleResponse)
    //  .catch(this.handleError);

    return this.httpClient
      .post(this.contactsUrlPort + "/login", user, this.noAuthHeader)
      .pipe(
        map(res => {
          this.storage.setToken(this.storageKey, res["token"]);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  getUserProfile() {
    return this.httpClient.get(this.contactsUrlPort + "/account/profile");
  }

  // Helper Methods

  /**
   * name
   */
  public setToken(token) {
    this.storage.setToken(this.storageKey, token);
  }

  public getToken() {
    return this.storage.getItem(this.storageKey);
  }

  public deleteToken() {
    this.storage.removeItem(this.storageKey);
  }
  /**
   * getUserPayload
   */
  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob((token as string).split(".")[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
