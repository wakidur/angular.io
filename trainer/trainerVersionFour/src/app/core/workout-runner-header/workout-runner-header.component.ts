import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, ParamMap } from "@angular/router";
import { map, filter, mergeMap } from "rxjs/operators";
import {Subscription } from 'rxjs';
import * as _ from "lodash";
import { TranslateService } from '@ngx-translate/core';

import { UserService } from "../user.service";

@Component({
  selector: "app-workout-runner-header",
  templateUrl: "./workout-runner-header.component.html",
  styles: []
})
export class WorkoutRunnerHeaderComponent implements OnInit, OnDestroy {
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
  private subscription: Subscription;
  constructor(
    private router: Router,
    private userService: UserService,
    private translate: TranslateService,
    private route: ActivatedRoute
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
    this.checkUserLongInStatus = this.userService.isLoggedIn();
    const getRole = this.userService.getUserPayload();
    if (getRole !== null && getRole["roles"]) {
      if (getRole.roles.length > 0) {
        const statusValueFilter = _.filter(getRole.roles, function (o) {
          return o === "superAdmin" || o === "administrator" || o === "admin";
        });
        if (statusValueFilter.length > 0) {
          this.isDeshboardUser = true;
        }
      } else {
        console.log("Not role");
      }
    }

    // subscribe to router event
   
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
        let locale = param['locale'];
        if (locale !== undefined) {
            this.translate.use(locale);
        }
      });
  }

  /**
   * onLogout
   */
  public onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/home"]);
  }

  /**
   * changeLanguage
   */
  public changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
}
