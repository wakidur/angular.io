/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import { Observable, of, throwError, forkJoin } from "rxjs";
import { catchError, map } from "rxjs/operators";
/**
 * Application dependency
 */
import { CoreModule } from "./core.module";
import { User, Login } from "../core/model/user.model";

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  // Class member variable
  users: Array<User> = [];
  user: User;
  collectionsUrl = "https://api.mlab.com/api/1/databases/training/collections";
  apiKey = "TRZfI48FK_XQeAyB5EE5-7z3d8wFgcgV";
  params = "?apiKey=" + this.apiKey;
  private contactsUrlPort = "http://localhost:3000/api/users";
  constructor(public httpClient: HttpClient) {}

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
      catchError(this.handleError("getExercise", []))
    );
  }

  /**
   * Ceate User
   */
  public createUser(user: User): Observable<User> {
    // let body = JSON.stringify({ name });
    // let headers = new Headers({ "Content-Type": "application/json" });
    // let options = new RequestOptions({ headers: headers });

    return this.httpClient.post(this.contactsUrlPort + "/signup", user).pipe(
      map(response => response as User),
      catchError(this.handleError<User>())
    );
  }

  /**
   * POST /login
   * Sign in using email and password.
   */

  logIn(user: Login): Observable<Object> {
    // let body = JSON.stringify({ name });
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.contactsUrlPort + "/login", body, options)
    //   .map(this.handleResponse)
    //  .catch(this.handleError);

    return this.httpClient.post(this.contactsUrlPort + "/login", user).pipe(
      map(res => {
        if (!res) {
          throw new Error("Value expected!");
        }
        return res;
      }),
       catchError(this.handleError("getExercise", []))
      // catchError(err => of([]))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        // console.log("HTTP 404 Not found error");
        return of(result as T);
      } else {
        // console.error(error);
        return throwError("An error occurred:", error.error.message);
      }
    };
  }
}
