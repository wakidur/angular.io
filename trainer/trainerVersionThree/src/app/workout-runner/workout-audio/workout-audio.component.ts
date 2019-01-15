import { Component, OnInit, ViewChild } from "@angular/core";

import { MyAudioDirective } from "../../shared/my-audio.directive";
import {
  ExerciseProgressEvent,
  ExerciseChangedEvent
} from "../../core/model/workoutModel";

@Component({
  selector: "app-workout-audio",
  templateUrl: "./workout-audio.component.html",
  styles: []
})
export class WorkoutAudioComponent implements OnInit {
  /**
   * The @ViewChild decorator instructs the Angular DI framework to search
   * for some specific child component/directive/element in the component tree and inject it into the parent.
   * Angular injects the directive (MyAudioDirective) into the WorkoutAudioComponent property: ticks.
   * The search is done based on the selector passed to the @ViewChild decorator.
   * @ViewChild('ticks') private ticks: MyAudioDirective;
   * The selector parameter on ViewChild can be a string value,
   * in which case Angular searches for a matching template variable
   *
   * it can be a type
   * This is valid and should inject an instance of MyAudioDirective
   * @ViewChild(MyAudioDirective) private ticks: MyAudioDirective
   */
  @ViewChild("ticks")  private ticks: MyAudioDirective;
  @ViewChild("nextUp") private nextUp: MyAudioDirective;
  @ViewChild("nextUpExercise") private nextUpExercise: MyAudioDirective;
  @ViewChild("halfway") private halfway: MyAudioDirective;
  @ViewChild("aboutToComplete") private aboutToComplete: MyAudioDirective;
  public nextupSound: string;

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
