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
import { User, Login, ListOfRoles, SearchName } from "../core/model/user.model";
import { SessionStorageService } from "../core/session-storage.service";

@Injectable()
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

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

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
      map(res => res as User[]),
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
  public getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob((token as string).split(".")[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  public isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // user role managment
  /*************************** List of user Roles ************************** */
  /**
   * getListOfUserRoles
   */
  public getListOfUserRoles(): Observable<ListOfRoles[]> {
    return this.httpClient.get(this.contactsUrlPort + "/list-of-roles").pipe(
      map(response => response as ListOfRoles[]),
      catchError(this.handleError)
    );
  }

  /**
   * postUserRole
   */
  public postListOfUserRole(value) {
    return this.httpClient
      .post(this.contactsUrlPort + "/list-of-roles", value)
      .pipe(
        map(response => {
          if (response) {
            return "success full save";
          } else {
            return "some proble";
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * updateListOfUserRole
   * @param value
   */
  public updateListOfUserRole(value) {
    return this.httpClient
      .put(this.contactsUrlPort + "/list-of-roles", value)
      .pipe(
        map(response => {
          return "Update Successfully";
        }),
        catchError(this.handleError)
      );
  }

  /**
   * deleteListOfUserRole
   */
  public deleteListOfUserRole(delContactId): Observable<string> {
    const url = `${this.contactsUrlPort}/list-of-roles`;
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: delContactId
    };
    return this.httpClient.delete(url, httpOptions).pipe(
      map(res => {
        return "List of User Role  successfully Delete";
      }),
      catchError(this.handleError)
    );
  }

  /**
   * getListOfUserRoleByName
   */
  public getListOfUserRoleByName(value) {
    return this.httpClient
      .get(this.contactsUrlPort + "/list-of-roles/" + value)
      .pipe(
        map(res => {
          console.log(res["name"]);
          if (res["name"] === value) {
            return true;
          } else if (res["name"] === "not found") {
            return false;
          } else {
            return false;
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * searchRoleByName
   */
  public searchRoleByName(value: SearchName): Observable<any> {
    return this.httpClient
      .post(this.contactsUrlPort + "/list-of-roles/search", value)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  /*************************** List of Resource ************************** */

  /**
   * getListOfResource
   */
  public getListOfResource(): Observable<ListOfRoles[]> {
    return this.httpClient.get(this.contactsUrlPort + "/list-of-resources").pipe(
      map(response => response as ListOfRoles[]),
      catchError(this.handleError)
    );
  }

  /**
   * postResource
   */
  public postListOfResource(value) {
    return this.httpClient
      .post(this.contactsUrlPort + "/list-of-resources", value)
      .pipe(
        map(response => {
          if (response) {
            return "success full save";
          } else {
            return "some proble";
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * updateListOfResource
   * @param value
   */
  public updateListOfResource(value) {
    return this.httpClient
      .put(this.contactsUrlPort + "/list-of-resources", value)
      .pipe(
        map(response => {
          return "Update Successfully";
        }),
        catchError(this.handleError)
      );
  }

  /**
   * deleteListOfResource
   */
  public deleteListOfResource(delContactId): Observable<string> {
    const url = `${this.contactsUrlPort}/list-of-resources`;
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      body: delContactId
    };
    return this.httpClient.delete(url, httpOptions).pipe(
      map(res => {
        return "List of User Role  successfully Delete";
      }),
      catchError(this.handleError)
    );
  }

  /**
   * getListOfResourceByName
   */
  public getListOfResourceByName(value) {
    return this.httpClient
      .get(this.contactsUrlPort + "/list-of-resources/" + value)
      .pipe(
        map(res => {
          console.log(res["name"]);
          if (res["name"] === value) {
            return true;
          } else if (res["name"] === "not found") {
            return false;
          } else {
            return false;
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * searchRoleByName
   */
  public searchResourceByName(value: SearchName): Observable<any> {
    return this.httpClient
      .post(this.contactsUrlPort + "/list-of-resources/search", value)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  // using Rxjs
  public UsingRxJs() {
    this.httpClient
      .get(this.contactsUrlPort)
      .pipe(
        map(res => {
          if (!res) {
            throw new Error("Value expected!");
          }
          return res;
        }),
        catchError(err => of([]))
      )
      .subscribe({
        next(x) {
          console.log("data: ", x);
        },
        error(err) {
          console.log("errors already caught... will not run");
        }
      });
  }
}
