import { Component, OnInit, ViewChild } from "@angular/core";
import { WrapAudioDirective } from "../../shared/wrap-audio.directive";
import {
  ExerciseProgressEvent,
  ExerciseChangedEvent
} from "../../workout-runner/model/model";
@Component({
  selector: "app-workout-audio",
  templateUrl: "./workout-audio.component.html",
  styles: []
})
export class WorkoutAudioComponent implements OnInit {
  @ViewChild("ticks")
  private ticks: WrapAudioDirective;
  @ViewChild("nextUp")
  private nextUp: WrapAudioDirective;
  @ViewChild("nextUpExercise")
  private nextUpExercise: WrapAudioDirective;
  @ViewChild("halfway")
  private halfway: WrapAudioDirective;
  @ViewChild("aboutToComplete")
  private aboutToComplete: WrapAudioDirective;
  private nextupSound: string;

  constructor() {}

  ngOnInit() {}

  stop() {
    this.ticks.stop();
    this.nextUp.stop();
    this.halfway.stop();
    this.aboutToComplete.stop();
    this.nextUpExercise.stop();
  }
  resume() {
    this.ticks.start();
    if (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete) {
      this.nextUp.start();
    } else if (
      this.nextUpExercise.currentTime > 0 &&
      !this.nextUpExercise.playbackComplete
    ) {
      this.nextUpExercise.start();
    } else if (this.halfway.currentTime > 0 && !this.halfway.playbackComplete) {
      this.halfway.start();
    } else if (
      this.aboutToComplete.currentTime > 0 &&
      !this.aboutToComplete.playbackComplete
    ) {
      this.aboutToComplete.start();
    }
  }

  onExerciseProgress(progress: ExerciseProgressEvent) {
    if (
      progress.runningFor === Math.floor(progress.exercise.duration / 2) &&
      progress.exercise.exercise.name !== "rest"
    ) {
      this.halfway.start();
    } else if (progress.timeRemaining === 3) {
      this.aboutToComplete.start();
    }
  }

  onExerciseChanged(state: ExerciseChangedEvent) {
    if (state.current.exercise.name === "rest") {
      this.nextupSound = state.next.exercise.nameSound;
      setTimeout(() => this.nextUp.start(), 2000);
      setTimeout(() => this.nextUpExercise.start(), 3000);
    }
  }
}
