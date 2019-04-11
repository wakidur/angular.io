/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * Application
 */

import { UserService } from "../core/user.service";
import { AuthService } from "./auth.service";


// @Injectable({providedIn: 'root'})
@Injectable()
export class JwtInterceptor  implements HttpInterceptor {
  constructor(
    public userService: UserService,
    public authService: AuthService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(
        event => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          const elapsed = Date.now() - started;
          console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.collectFailedRequest(req);
            // redirect to the login route
            // or show a modal
          }
        }
      })
    );
  }
}




