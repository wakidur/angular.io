/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

// incorporate a third-party library

import { ModalModule } from "ngx-modialog";
import { BootstrapModalModule } from "ngx-modialog/plugins/bootstrap";

/**
 *
 * The header component will not render unless
 * we import the core module and export the component from the core module.
 */
import { WorkoutRunnerHeaderComponent } from "./workout-runner-header/workout-runner-header.component";
import { WorkoutRunnerFooterComponent } from "./workout-runner-footer/workout-runner-footer.component";
import { AlertNotificationsComponent } from "./alert-notifications/alert-notifications.component";

@NgModule({
  declarations: [
    WorkoutRunnerHeaderComponent,
    WorkoutRunnerFooterComponent,
    AlertNotificationsComponent,
    AlertNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    HttpClientModule
  ],
  exports: [
    WorkoutRunnerHeaderComponent,
    WorkoutRunnerFooterComponent,
    AlertNotificationsComponent
  ]
})
export class CoreModule {}
