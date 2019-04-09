/**
 * Frameworks dependency
 *
 * FormsModule
 * This brings in all that we will need to implement our form including
 * •	NgForm
 * •	ngModel
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


/**
 * Application dependency Module
 * WorkoutBuilderRoutingModule
 * SharedModule
 * AuthModule
 */
import { WorkoutBuilderRoutingModule } from "./workout-builder-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../auth/auth.module";
/**
 * Application Components List
 *
 * WorkoutBuilderComponent
 * ExerciseComponent
 * ExercisesComponent
 * WorkoutComponent
 * WorkoutsComponent
 * LeftNavExercisesComponent
 * LeftNavMainComponent
 * TopNavMainComponent
 *
 */
import { WorkoutBuilderComponent } from "./workout-builder.component";
import { ExerciseComponent } from "./exercise/exercise.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { WorkoutComponent } from "./workout/workout.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { LeftNavExercisesComponent } from "./navigation/left-nav-exercises/left-nav-exercises.component";
import { LeftNavMainComponent } from "./navigation/left-nav-main/left-nav-main.component";
import { TopNavMainComponent } from "./navigation/top-nav-main/top-nav-main.component";

/**
 * Application Service List
 *
 * WorkoutBuilderService
 */
import { WorkoutBuilderService } from "./builder-services/workout-builder.service";
import { ExerciseBuilderService } from "./builder-services/exercise-builder.service";
import { WorkoutResolverGuard } from "./workout/workout-resolver.guard";
import { ExerciseResolverGuard } from "./exercise/exercise-resolver.guard";


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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    WorkoutBuilderRoutingModule,
    AuthModule
  ],
  providers: [
    WorkoutBuilderService,
    ExerciseBuilderService,
    WorkoutResolverGuard,
    ExerciseResolverGuard
  ]
})
export class WorkoutBuilderModule {}
