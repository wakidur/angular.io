import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";
import * as _ from "lodash";

import { UserService } from "../user.service";

@Component({
  selector: "app-workout-runner-header",
  templateUrl: "./workout-runner-header.component.html",
  styles: []
})
export class WorkoutRunnerHeaderComponent implements OnInit {
  public deshborarUser: Array<string> = [
    "superAdmin",
    "administrator",
    "admin"
  ];
  public checkUserLongInStatus: boolean = false;
  public isSuperAdmin: boolean = false;
  public showHistoryLink = true;
  public showWorkoutLink = true;
  public showBuilderLink = true;
  public isDeshboardUser: boolean = false;
  constructor(private router: Router, private userService: UserService) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.url.startsWith("/workout")) {
          this.showHistoryLink = !e.url.startsWith("/workout");
          this.showWorkoutLink = !e.url.startsWith("/workout");
        } else if (e.url.startsWith("/history")) {
          this.showHistoryLink = !e.url.startsWith("/history");
          this.showWorkoutLink = !e.url.startsWith("/workout");
        } else if (e.url.startsWith("/builder")) {
          this.showBuilderLink = !e.url.startsWith("/builder");
        } else {
        }
      });
  }
  ngOnInit() {
    this.checkUserLongInStatus = this.userService.isLoggedIn();
    console.log(this.checkUserLongInStatus);
    console.log(this.isDeshboardUser);
    const getRole = this.userService.getUserPayload();
    console.log(getRole);
    if (getRole["roles"]) {
      if (getRole.roles.length > 0) {
        const statusValueFilter = _.filter(getRole.roles, function(o) {
          return o === "superAdmin" || o === "administrator" || o === "admin";
        });
        if (statusValueFilter.length > 0) {
          this.isDeshboardUser = true;
        }
      } else {
        console.log("Not role");
      }
    }
  }

  /**
   * onLogout
   */
  public onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/home"]);
  }
}
