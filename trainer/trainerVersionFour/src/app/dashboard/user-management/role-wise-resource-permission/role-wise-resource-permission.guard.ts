import { Injectable } from "@angular/core";
import {
  CanActivate,
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

/**
 * Application dependency
 */

import {
  ListOfResources,
  ListOfUserRoles
} from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";

@Injectable()
export class RoleWiseResourcePermissionGuard
  implements CanActivate, Resolve<ListOfResources> {
  public listOfResources: ListOfResources;

  constructor(public userService: UserService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const resourceName = route.paramMap.get("id");

    return this.userService.getListOfResource().pipe(
      map(response => {
        if (response) {
          return response;
        } else {
          return "No value found";
        }
      }),
      catchError(error => {
        return of(error);
      })
    );
  }
}
