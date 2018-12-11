import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkoutRunnerComponent } from "./workout-runner.component";

@NgModule({
  declarations: [
    WorkoutRunnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WorkoutRunnerComponent
  ]
})
export class WorkoutRunnerModule {}
