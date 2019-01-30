/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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

@NgModule({
  declarations: [
    WorkoutRunnerHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  exports: [
    WorkoutRunnerHeaderComponent
  ]
})
export class CoreModule {}
