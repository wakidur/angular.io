import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map, filter } from "rxjs/operators";

import { Alert, AlertType } from "./model/user.model";

import { CoreModule } from "./core.module";

@Injectable({
  providedIn: CoreModule
})
export class AlertNotificationsService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  /**
   * subscribe to alerts
   *  getAlert
   */
  public getAlert(alertId?: string): Observable<any> {
    return this.subject
      .asObservable()
      .pipe(filter((x: Alert) => x && x.alertId === alertId));
  }

  /**
   * clear alerts
   * clear
   */
  public clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
  }
}
