import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";

import { UserService } from "../user.service";


@Component({
  selector: "app-workout-runner-header",
  templateUrl: "./workout-runner-header.component.html",
  styles: []
})
export class WorkoutRunnerHeaderComponent implements OnInit {
  public checkUserLongInStatus: boolean = false;
  public showHistoryLink = true;
  public showWorkoutLink = true;
  public showBuilderLink = true;
  constructor(
    private router: Router,
    private userService: UserService
    ) {
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
    this.checkUserLongInStatus  =  this.userService.isLoggedIn();
    if (this.checkUserLongInStatus ) {
      console.log(this.checkUserLongInStatus );
    } else {
      console.log(this.checkUserLongInStatus );
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
