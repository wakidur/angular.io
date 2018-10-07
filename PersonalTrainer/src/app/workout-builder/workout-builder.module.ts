import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WorkoutBuilderComponent } from "./workout-builder.component";
import { ExerciseComponent } from "./exercise/exercise.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { WorkoutComponent } from "./workout/workout.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { WorkoutBuilderRoutingModule } from "./workout-builder-routing.module";
import { LeftNavExercisesComponent } from "./navigation/left-nav-exercises/left-nav-exercises.component";
import { LeftNavMainComponent } from "./navigation/left-nav-main/left-nav-main.component";
import { SubNavMainComponent } from "./navigation/sub-nav-main/sub-nav-main.component";
import { SharedModule } from "../shared/shared.module";

import { WorkoutBuilderService } from "./builder-services/builder-services.service";
import { WorkoutResolverService } from "./workout/workout-resolver.service";

import { ExerciseBuilderService } from "./builder-services/exercise-builder.service";
import { ExerciseResolverService } from "./exercise/exercise-resolver.service";




@NgModule({
    imports: [
        CommonModule,
        WorkoutBuilderRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        WorkoutBuilderComponent,
        ExerciseComponent,
        ExercisesComponent,
        WorkoutComponent,
        WorkoutsComponent,
        LeftNavExercisesComponent,
        LeftNavMainComponent,
        SubNavMainComponent
    ],
    providers: [WorkoutBuilderService, WorkoutResolverService, ExerciseBuilderService, ExerciseResolverService]
})
export class WorkoutBuilderModule { }
