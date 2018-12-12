// // framework
// import { Component, OnInit } from "@angular/core";
// // application dependencies
// import {
//   WorkoutPlan,
//   WorkoutPlanIns,
//   ExercisePlan,
//   Exercise
// } from "./model/workout.model";

// @Component({
//   selector: "app-workout-runner",
//   templateUrl: "./workout-runner.component.html",
//   styles: []
// })
// export class WorkoutRunnerComponent implements OnInit {
//   // component variable
//   workoutPlan: WorkoutPlan;
//   WorkoutPlanIns: WorkoutPlanIns;
//   workoutTimeRemaining: number;
//   restExercise: ExercisePlan;
//   currentExerciseIndex: number;
//   currentExercise: ExercisePlan;
//   exerciseRunningDuration: number;
//   constructor() {}

//   ngOnInit() {
//     this.WorkoutPlanIns = this.buildWorkoutIns();
//     this.workoutPlan = this.buildWorkout();
//   }

//   private buildWorkoutIns(): WorkoutPlanIns {
//     const workoutIns: WorkoutPlanIns = {
//       name: "7MinWorkout",
//       title: "7 Minute Workout",
//       restBetweenExercise: 10,
//       exercises: ["wakid", "Rahman", "hie"]
//     };
//     // const workout = new WorkoutPlanIns();
//     // workout.name = "7MinWorkout";
//     return workoutIns;
//   }

//   private buildWorkout(): WorkoutPlan {
//     const workout = new WorkoutPlan("7MinWorkout", "7 Minute Workout", 10, []);
//     workout.exercises.push(new ExercisePlan(new Exercise()));
//     return workout;
//   }
// }
