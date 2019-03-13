/**
 * Frameworks dependency
*/
import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Application dependency
 */
import { Alert, AlertType } from "./model/user.model";


@Injectable()
export class AlertNotificationsService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
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
   * main alert method
   */
  private alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange;
    this.subject.next(alert);
  }

  /**
   * clear alerts
   * clear
   */
  public clear(alertId?: string) {
    this.subject.next(new Alert({ alertId }));
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
   *
   * successAlert
   */
  public successAlert(message: string) {
    this.alert(new Alert({message, type: AlertType.Success}));
  }
  /**
   *
   * errorAlert
   */
  public errorAlert(message: string) {
    this.alert(new Alert({message, type: AlertType.Error}));
  }
  /**
   *
   * infoAlert
   */
  public infoAlert(message: string) {
    this.alert(new Alert({message, type: AlertType.Info}));
  }
  /**
   *
   * warnAlert
   */
  public warnAlert(message: string) {
    this.alert(new Alert({message, type: AlertType.Warning}));
  }

}
