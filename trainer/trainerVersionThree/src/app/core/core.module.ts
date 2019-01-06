
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

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
