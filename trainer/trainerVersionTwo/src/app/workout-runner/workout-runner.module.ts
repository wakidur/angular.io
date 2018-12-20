import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkoutRunnerComponent } from "./workout-runner.component";
import { ExerciseDescriptionComponent } from "./exercise-description/exercise-description.component";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { SecondsToTimePipe } from "./shared/seconds-to-time.pipe";

@NgModule({
  declarations: [
    // adding a component/directive/pipe to the declaration section of a module makes them available inside the module.
    WorkoutRunnerComponent,
    ExerciseDescriptionComponent,
    VideoPlayerComponent,
    SecondsToTimePipe
  ],
  imports: [CommonModule],
  exports: [
    // we export the component/directive/pipe that it becomes available to be used across modules.
    WorkoutRunnerComponent
  ]
})
export class WorkoutRunnerModule {}
