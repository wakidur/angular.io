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
  @ViewChild("ticks") private ticks: MyAudioDirective;
  @ViewChild("nextUp") private nextUp: MyAudioDirective;
  @ViewChild("nextUpExercise") private nextUpExercise: MyAudioDirective;
  @ViewChild("halfway") private halfway: MyAudioDirective;
  @ViewChild("aboutToComplete") private aboutToComplete: MyAudioDirective;
  public nextupSound: string;
  constructor() {}

  ngOnInit() {}

  /**
   * stop
   */
  public stop() {
    this.ticks.stop();
    this.nextUp.stop();
    this.halfway.stop();
    this.aboutToComplete.stop();
    this.nextUpExercise.stop();
  }

  /**
   * resume
   */
  public resume() {
    this.ticks.start();
    if (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete) {
      this.nextUp.start();
    } else if (this.nextUpExercise.currentTime > 0 && !this.nextUpExercise.playbackComplete ) {
        this.nextUpExercise.start();
    } else if (this.halfway.currentTime > 0 && !this.halfway.playbackComplete) {
      this.halfway.start();
    } else if (
      this.aboutToComplete.currentTime > 0 && !this.aboutToComplete.playbackComplete ) {
        this.aboutToComplete.start();
    }

    // switch (true) {
    //   case (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete):
    //         this.nextUp.start();
    //     break;
    //   case (this.nextUpExercise.currentTime > 0 && !this.nextUpExercise.playbackComplete):
    //         this.nextUpExercise.start();
    //     break;
    //   case (this.halfway.currentTime > 0 && !this.halfway.playbackComplete):
    //         this.halfway.start();
    //     break;
    //   case (this.aboutToComplete.currentTime > 0 && !this.aboutToComplete.playbackComplete):
    //         this.aboutToComplete.start();
    //     break;

    //   default:
    //     console.log("switch state ");
    //     break;
    // }
  }


}
