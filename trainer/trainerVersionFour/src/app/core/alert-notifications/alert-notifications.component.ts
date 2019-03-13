/**
 * Frameworks dependency
 */
import { Component, OnInit, Input } from "@angular/core";

/**
 * Application dependency
 */
import { Alert, AlertType } from "../model/user.model";
import { AlertNotificationsService } from "../alert-notifications.service";

@Component({
  selector: "app-alert-notifications",
  templateUrl: "./alert-notifications.component.html",
  styles: []
})
export class AlertNotificationsComponent implements OnInit {
  @Input() id: string;
  public alerts: Alert[] = [];
  constructor(private alertNotificationsService: AlertNotificationsService) {}

  ngOnInit() {
    this.alertNotificationsService
      .getAlert(this.id)
      .subscribe((alert: Alert) => {
        if (!alert.message) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }
        // add alert to array
        this.alerts.push(alert);
      });
  }

  /**
   * removeAlert
   */
  public removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  /**
   * cssClass
   */
  public cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return "alert alert-success alert-dismissible";
      case AlertType.Error:
        return "alert alert-danger alert-dismissible";
      case AlertType.Info:
        return "alert alert-info alert-dismissible";
      case AlertType.Warning:
        return "alert alert-warning alert-dismissible";
      default:
        return "alert";
    }
  }
}
