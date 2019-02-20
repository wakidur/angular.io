/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

/**
 * Application
 */
import { AuthModule } from "./auth.module";
import { UserService } from "../core/user.service";

@Injectable({
  providedIn: AuthModule
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl("/user/sign-in");
      this.userService.deleteToken();
      return false;
    }
    return true;
  }
}
