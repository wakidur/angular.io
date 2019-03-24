/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";
/**
 * Application dependency
 */

import { Exercise } from "../../core/model/workoutModel";
import { WorkoutService } from "../../core/workout.service";

@Injectable()
export class ExerciseBuilderService {
  public buildingExercise: any;
  public newExercise: boolean;
  constructor(private workoutService: WorkoutService) {}

  /**
   * startBuilding
   */
  public startBuildingNew() {
    this.buildingExercise = new Exercise("", "", "", "");
    this.newExercise = true;
    return this.buildingExercise;
  }
  public startBuildingExisting(name: string) {
    this.newExercise = false;
    return this.workoutService.getExercise(name);
  }

  /**
   * saveExercise
   */
  public saveExercise() {
    const exercise = this.newExercise
      ? this.workoutService.addExercise(this.buildingExercise)
      : this.workoutService.updateExercise(this.buildingExercise);
    this.newExercise = false;
    return exercise;
  }
  
  /**
   * deleteExercise
   */
  public deleteExercise() {
    this.workoutService.deleteExercise(this.buildingExercise.name);
  }
  /**
   * addExerciseVideo
   */
  public addExerciseVideo() {
    if (!this.buildingExercise.videos) {
      this.buildingExercise.videos = [];
    }
    this.buildingExercise.videos.push("");
  }

  /**
   * deleteExerciseVideo
   */
  public deleteExerciseVideo(index: number) {
    if (index >= 0) {
      this.buildingExercise.videos.slice(index, 1);
    }
  }

  /**
   * canDeleteExercise
   */
  public canDeleteExercise() {
    return !this.newExercise;
  }
}
