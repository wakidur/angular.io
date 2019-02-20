/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

/**
 * Application
 */
import { AuthModule } from "./auth.module";
import { UserService } from "../core/user.service";

@Injectable({ providedIn: AuthModule })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get("noauth")) {
      return next.handle(req.clone());
    } else {
      const clonedreq = req.clone({
        headers: req.headers.set(
          "Authorization",
          "Bearer " + this.userService.getToken()
        )
      });
      return next.handle(clonedreq).pipe(
        tap(
          event => {},
          err => {
            if (err.error.auth == false) {
              this.router.navigateByUrl("/user/sign-in");
            }
          }
        )
      );
    }
  }
}
