import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CoreModule } from "../core/core.module";
import { WorkoutRunnerComponent } from "./workout-runner.component";
import { ExerciseDescriptionComponent } from "./exercise-description/exercise-description.component";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { VideoDialogComponent } from "./video-player/video-dialog/video-dialog.component";
import { WorkoutAudioComponent } from "./workout-audio/workout-audio.component";
import { WorkoutContainerComponent } from "./workout-container/workout-container.component";
import { SharedModule } from "../shared/shared.module";
import { LocalStorageWorkoutComponent } from "./local-storage-workout/local-storage-workout.component";
import { LocalStorageWorkoutContainerComponent } from "./local-storage-workout-container/local-storage-workout-container.component";
import { LoaderModule } from "../loader/loader.module";

@NgModule({
  declarations: [
    WorkoutRunnerComponent,
    ExerciseDescriptionComponent,
    VideoPlayerComponent,
    VideoDialogComponent,
    WorkoutAudioComponent,
    WorkoutContainerComponent,
    LocalStorageWorkoutComponent,
    LocalStorageWorkoutContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    LoaderModule
  ],
  exports: [],
  entryComponents: [VideoDialogComponent]
})
export class WorkoutRunnerModule {}
