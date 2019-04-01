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
  public checkUserLongInStatus: boolean = false;
  public isSuperAdmin: boolean = false;
  public showHistoryLink = true;
  public showWorkoutLink = true;
  public showBuilderLink = true;
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

    if (this.checkUserLongInStatus) {
      console.log(this.checkUserLongInStatus);
    } else {
      console.log(this.checkUserLongInStatus);
    }

    // this.userService.getUserPayload().subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   err => {
    //     console.log('object :', err);
    //   }
    //   );

    const getRole = this.userService.getUserPayload();
    if (getRole.roles.length > 0) {
      let status = false;
      getRole.roles.find(element => {
        status = element === "superAdmin" || element === "administrator" || element === "admin" ? true : false;
        console.log(this.isSuperAdmin);
      });
    } else {
      console.log(" No role exist");
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
