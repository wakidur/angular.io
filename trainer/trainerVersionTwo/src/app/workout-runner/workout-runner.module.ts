import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkoutRunnerComponent } from "./workout-runner.component";

@NgModule({
  declarations: [
    // adding a component/directive/pipe to the declaration section of a module makes them available inside the module.
    WorkoutRunnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // we export the component/directive/pipe that it becomes available to be used across modules.
    WorkoutRunnerComponent
  ]
})
export class WorkoutRunnerModule {}
