
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
/**
 * the header component will not render unless
 * we import the core module and export the component from the core module.
 */
import { WorkoutRunnerHeaderComponent } from "./workout-runner-header/workout-runner-header.component";

@NgModule({
  declarations: [
    WorkoutRunnerHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WorkoutRunnerHeaderComponent
  ]
})
export class CoreModule {}
