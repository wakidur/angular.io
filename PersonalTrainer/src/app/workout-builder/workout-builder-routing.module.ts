import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WorkoutBuilderComponent } from "./workout-builder.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { WorkoutComponent } from "./workout/workout.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { ExerciseComponent } from "./exercise/exercise.component";
import { WorkoutResolverService } from "./workout/workout-resolver.service";
import { ExerciseResolverService } from "./exercise/exercise-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: WorkoutBuilderComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "workouts" },
      { path: "workouts", component: WorkoutsComponent },
      { path: "workout/new", component: WorkoutComponent, resolve: {workout: WorkoutResolverService} },
      { path: "workout/:id", component: WorkoutComponent, resolve: {workout: WorkoutResolverService} },
      { path: "exercises", component: ExercisesComponent },
      { path: "exercise/new", component: ExerciseComponent, resolve: { exercise: ExerciseResolverService} },
      { path: "exercise/:id", component: ExerciseComponent, resolve: { exercise: ExerciseResolverService} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutBuilderRoutingModule {}
