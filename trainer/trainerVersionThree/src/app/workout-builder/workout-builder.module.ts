import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkoutBuilderRoutingModule } from "./workout-builder-routing.module";
import { WorkoutBuilderComponent } from "./workout-builder.component";
import { CoreModule } from "../core/core.module";
import { ExerciseComponent } from "./exercise/exercise.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { WorkoutComponent } from "./workout/workout.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { LeftNavExercisesComponent } from "./navigation/left-nav-exercises/left-nav-exercises.component";
import { LeftNavMainComponent } from "./navigation/left-nav-main/left-nav-main.component";
import { TopNavMainComponent } from "./navigation/top-nav-main/top-nav-main.component";

@NgModule({
  declarations: [
    WorkoutBuilderComponent,
    ExerciseComponent,
    ExercisesComponent,
    WorkoutComponent,
    WorkoutsComponent,
    LeftNavExercisesComponent,
    LeftNavMainComponent,
    TopNavMainComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    WorkoutBuilderRoutingModule
  ]
})
export class WorkoutBuilderModule {}
