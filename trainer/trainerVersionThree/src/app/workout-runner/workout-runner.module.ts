import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CoreModule } from "../core/core.module";
import { WorkoutRunnerComponent } from "./workout-runner.component";
import { ExerciseDescriptionComponent } from "./exercise-description/exercise-description.component";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { SecondsToTimePipe } from "./shared/seconds-to-time.pipe";
import { VideoDialogComponent } from "./video-player/video-dialog/video-dialog.component";

@NgModule({
  declarations: [
    WorkoutRunnerComponent,
    ExerciseDescriptionComponent,
    VideoPlayerComponent,
    SecondsToTimePipe,
    VideoDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    WorkoutRunnerComponent
  ],
  entryComponents: [
    VideoDialogComponent
  ]

})
export class WorkoutRunnerModule {}
