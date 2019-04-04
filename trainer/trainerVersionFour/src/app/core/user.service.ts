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
import { User, Login, ListOfRoles, SearchName, UserProfileForm } from "../core/model/user.model";
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

  private noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(
    public httpClient: HttpClient,
    private storage: SessionStorageService
  ) {}

  // getJSON
  /**
   * getJSON
   */
  public getJSON(filename: string): Observable<any> {
    return this.httpClient.get(filename).pipe(
        map(res => {
        if (!res) {
          throw new Error("Value expected!");
        }
        return res;
      }),
      catchError(err => of([]))
    );
  }

  /*******************  Helper Methods  ***************** */

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

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
   * getAllUserByObservable
   * /api/users/account
   */

  getAllUserByObservable(): Observable<User[]> {
    return this.httpClient.get(this.contactsUrlPort + "/account").pipe(
      map(res => res as User[]),
      catchError(this.handleError)
    );
  }

  /**
   * deleteUserAccount
   * /api/users/account
   */
  public deleteUserAccount(delContactId): Observable<string> {
    const url = `${this.contactsUrlPort}/account`;
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
   * Ceate User
   * createUser
   * /api/users/signup
   */
  public createUser(user: User): Observable<User> {
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
   * logInUser
   * /api/users/login
   */

  logInUser(user: Login) {
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

  /**
   * POST /login
   * Sign in using email and password.
   * logInUser
   * /api/users/account/profile
   */

  getUserProfile() {
    return this.httpClient.get(this.contactsUrlPort + "/account/profile").pipe(
      map(res  => res ),
      catchError(this.handleError)
    );
  }
  postUserProfile(profile: UserProfileForm) {
    return this.httpClient.post(this.contactsUrlPort + "/account/profile", profile).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  /** ============== user role managment =========================  */

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
    return this.httpClient
      .get(this.contactsUrlPort + "/list-of-resources")
      .pipe(
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

  /*************************** User Role ************************** */
  /**
   * getUserRole
   */
  public getUserRole() {
    return this.httpClient.get(this.contactsUrlPort + "/user-roles").pipe(
      map((response: Array<any>) => {
        const result: Array<any> = [];
        response.forEach(value => {
          if (value.user_id !== null) {
            result.push({
              name: value.user_id.fullname,
              email: value.user_id.email,
              roles: roles()
            });
          }
          function roles() {
            const arrayofRole: Array<any> = [];
            if (value.role_id.length > 0) {
              value.role_id.forEach(element => {
                arrayofRole.push(element.name);
              });
              // arrayofRole;
            }
            return arrayofRole.toString();
          }
        });
        return result;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * postUserRole
   */
  public postUserRole(value) {
    return this.httpClient
      .post(this.contactsUrlPort + "/user-roles", value)
      .pipe(
        map(response => {
          if (response) {
            return "success full save";
          } else {
            return "some problem";
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * getUserRoleByName
   */
  public getUserRoleById(value) {
    const userObject = {
      id: value._id,
      name: value.fullname,
      email: value.email
    };
    return this.httpClient
      .get(this.contactsUrlPort + "/user-roles/" + userObject.id)
      .pipe(
        map(res => {
          if (res[0]) {
            if (res[0]["user_id"] === userObject.id) {
              return true;
            }
          } else if (res["message"] === "Not found") {
            return false;
          } else {
            return false;
          }
        }),
        catchError(this.handleError)
      );
  }
  /*************************** role-wise-resource-permission ************************** */
  /**
   * getRoleWiseResourcePermission
   */
  public getRoleWiseResourcePermission() {
    return this.httpClient
      .get(this.contactsUrlPort + "/role-wise-resource-permission")
      .pipe(
        map((response: Array<any>) => {
          const result: Array<any> = [];
          response.forEach(value => {
            if (value.role_id !== null) {
              result.push({
                name: value.role_id.name,
                roles: roles()
              });
            }
            function roles() {
              const arrayofRole: Array<any> = [];
              if (value.resource_id.length > 0) {
                value.resource_id.forEach(element => {
                  arrayofRole.push(element.name);
                });
                // arrayofRole;
              }
              return arrayofRole.toString();
            }
          });
          return result;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * postRoleWiseResourcePermission
   */
  public postRoleWiseResourcePermission(value) {
    return this.httpClient
      .post(this.contactsUrlPort + "/role-wise-resource-permission", value)
      .pipe(
        map(response => {
          if (response) {
            return "success full save";
          } else {
            return "some problem";
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * getRoleWiseResourcePermissionByName
   */
  public getRoleWiseResourcePermissionById(value) {
    const userObject = {
      id: value._id,
      name: value.fullname,
      email: value.email
    };
    return this.httpClient
      .get(
        this.contactsUrlPort + "/role-wise-resource-permission/" + userObject.id
      )
      .pipe(
        map(res => {
          if (res[0]) {
            if (res[0]["role_id"] === userObject.id) {
              return true;
            }
          } else if (res["message"] === "Not found") {
            return false;
          } else {
            return false;
          }
        }),
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
