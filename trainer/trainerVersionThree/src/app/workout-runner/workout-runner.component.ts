// Framework Dependencies
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

// apps dependencies
import { WorkoutPlan, ExercisePlan, Exercise } from "./model/model";
import { WorkoutHistoryTrackerService } from "../core/workout-history-tracker.service";

@Component({
  selector: "app-workout-runner",
  templateUrl: "./workout-runner.component.html",
  styles: []
})
export class WorkoutRunnerComponent implements OnInit, OnDestroy  {
  workoutPlan: WorkoutPlan;
  workoutTimeRemaining: number;
  restExercise: ExercisePlan;
  currentExerciseIndex: number;
  currentExercise: ExercisePlan;
  exerciseRunningDuration: number;
  exerciseTrackingInterval: number;
  workoutPaused: boolean;

  /**
   * we register the Router service by importing the RouterModule into AppRoutingModule
   * @ param router
   * @ param tracker
   */
  constructor(
    private router: Router,
    private tracker: WorkoutHistoryTrackerService
  ) {}

  ngOnDestroy() {
    if (this.exerciseTrackingInterval) {
      clearInterval(this.exerciseTrackingInterval);
    }
    this.tracker.endTracking(false);
  }
  ngOnInit() {
    this.workoutPlan = this.buildWorkout();
    this.restExercise = new ExercisePlan(
      1,
      new Exercise(1, "rest", "Relax!", "Relax a bit", "rest.png"),
      this.workoutPlan.restBetweenExercise
    );
    this.start();
  }

  private start() {
    // start Workout History Tracker Service
    this.tracker.startTracking();
    this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
    this.currentExerciseIndex = 0;
    this.startExercise(this.workoutPlan.exercises[this.currentExerciseIndex]);
  }

  private startExercise(exercisePlan: ExercisePlan) {
    this.currentExercise = exercisePlan;
    this.exerciseRunningDuration = 0;
    this.startExerciseTimeTracking();
  }

  private startExerciseTimeTracking() {
    this.exerciseTrackingInterval = window.setInterval(() => {
      if (this.exerciseRunningDuration >= this.currentExercise.duration) {
        clearInterval(this.exerciseTrackingInterval);
        if (this.currentExercise !== this.restExercise) {
          this.tracker.exerciseComplete(
            this.workoutPlan.exercises[this.currentExerciseIndex]
          );
        }
        const next: ExercisePlan = this.getNextExercise();
        if (next) {
          if (next !== this.restExercise) {
            this.currentExerciseIndex++;
          }
          this.startExercise(next);
        } else {
          this.tracker.endTracking(true);
          this.router.navigate(["/finish"]);
        }
        return;
      }
      ++this.exerciseRunningDuration;
      --this.workoutTimeRemaining;
    }, 1000);
  }

  private getNextExercise(): ExercisePlan {
    let nextExercise: ExercisePlan = null;
    if (this.currentExercise === this.restExercise) {
      nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex + 1];
    } else if (
      this.currentExerciseIndex <
      this.workoutPlan.exercises.length - 1
    ) {
      nextExercise = this.restExercise;
    }

    return nextExercise;
  }

  private buildWorkout(): WorkoutPlan {
    const workout = new WorkoutPlan(
      1,
      "7MinWorkout",
      "7 Minute Workout",
      1,
      []
    );
    workout.exercises.push(
      new ExercisePlan(
        1,
        new Exercise(
          1,
          "jumpingJacks",
          "Jumping Jacks",
          "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
          "JumpingJacks.png",
          "jumpingjacks.wav",
          `Assume an erect position, with feet together and arms at your side. <br>
                            Slightly bend your knees, and propel yourself a few inches into the air. <br>
                            While in air, bring your legs out to the side about shoulder width or slightly wider. <br>
                            As you are moving your legs outward, you should raise your arms up over your head; arms should be
                            slightly bent throughout the entire in-air movement. <br>
                            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent`,
          ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        2,
        new Exercise(
          2,
          "wallSit",
          "Wall Sit",
          "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
          "wallsit.png",
          "wallsit.wav",
          `Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.
          Then, keeping your back against the wall, lower your hips until your knees form right angles.`,
          ["y-wV4Venusw", "MMV3v4ap4ro"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        3,
        new Exercise(
          3,
          "pushUp",
          "Push up",
          "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
          "Pushup.png",
          "pushups.wav",
          `Lie prone on the ground with hands placed as wide or slightly wider than shoulder width.
          Keeping the body straight, lower body to the ground by bending arms at the elbows.
          Raise body up off the ground by extending the arms.`,
          [
            "Eh00_rniF8E",
            "ZWdBqFLNljc",
            "UwRLWMcOdwI",
            "ynPwl6qyUNM",
            "OicNTT2xzMI"
          ]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        4,
        new Exercise(
          4,
          "crunches",
          "Abdominal Crunches",
          "The basic crunch is a abdominal exercise in a strength-training program.",
          "crunches.png",
          "crunches.wav",
          `Lie on your back with your knees bent and feet flat on the floor, hip-width apart.
          Place your hands behind your head so your thumbs are behind your ears.
          Hold your elbows out to the sides but rounded slightly in.
          Gently pull your abdominals inward.
          Curl up and forward so that your head, neck, and shoulder blades lift off the floor.
          Hold for a moment at the top of the movement and then lower slowly back down.`,
          ["Xyd_fa5zoEU", "MKmrqcoCZ-M"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        5,
        new Exercise(
          5,
          "stepUpOntoChair",
          "Step Up Onto Chair",
          "Step exercises are ideal for building muscle in your lower body.",
          "stepUpOntoChair.png",
          "stepup.wav",
          `Position your chair in front of you.
          Stand with your feet about hip width apart, arms at your sides.
          Step up onto the seat with one foot, pressing down while bringing your other foot up next to it.
          Step back with the leading foot and bring the trailing foot down to finish one step-up.`,
          ["aajhW7DD1EA"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        6,
        new Exercise(
          6,
          "squat",
          "Squat",
          "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
          "squat.png",
          "squats.wav",
          `Stand with your head facing forward and your chest held up and out.
              Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.
              Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit.
              Rather than allowing your back to round, let your lower back arch slightly as you go down.
              Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.
              Keep your body tight, and push through your heels to bring yourself back to the starting position.`,
          ["QKKZ9AGYTi4", "UXJrBgI2RxA"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        7,
        new Exercise(
          7,
          "tricepdips",
          "Tricep Dips On Chair",
          "A body weight exercise that targets triceps.",
          "tricepdips.png",
          "tricepdips.wav",
          `Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.
          Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.
          Without moving your legs, bring your glutes forward off the chair.
          Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position.`,
          ["tKjcgfu44sI", "jox1rb5krQI"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        8,
        new Exercise(
          8,
          "plank",
          "Plank",
          `The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that
          involves maintaining a difficult position for extended periods of time.`,
          "Plank.png",
          "plank.wav",
          `Get into pushup position on the floor.
          Bend your elbows 90 degrees and rest your weight on your forearms.
          Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.
          Hold this position.`,
          ["pSHjTRCQxIw", "TvxNkmjdhMM"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        9,
        new Exercise(
          9,
          "highKnees",
          "High Knees",
          "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
          "highknees.png",
          "highknees.wav",
          `Start standing with feet hip-width apart.
          Do inplace jog with your knees lifting as much as possible towards your chest.`,
          ["OAJ_J3EZkdY", "8opcQdC-V-U"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        10,
        new Exercise(
          10,
          "lunges",
          "Lunges",
          `Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups,
          including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings.`,
          "lunges.png",
          "lunge.wav",
          `Start standing with feet hip-width apart.
              Do inplace jog with your knees lifting as much as possible towards your chest.`,
          ["Z2n58m2i4jg"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        11,
        new Exercise(
          11,
          "pushupNRotate",
          "Pushup And Rotate",
          "A variation of pushup that requires you to rotate.",
          "pushupNRotate.png",
          "pushupandrotate.wav",
          `Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.
          Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling.`,
          ["qHQ_E-f5278"]
        ),
        2
      )
    );

    workout.exercises.push(
      new ExercisePlan(
        12,
        new Exercise(
          12,
          "sidePlank",
          "Side Plank",
          "A variation to Plank done using one hand only.",
          "sideplank.png",
          "sideplank.wav",
          `Lie on your side, in a straight line from head to feet, resting on your forearm.
          Your elbow should be directly under your shoulder.
          With your abdominals gently contracted, lift your hips off the floor, maintaining the line.
          Keep your hips square and your neck in line with your spine. Hold the position.`,
          ["wqzrb67Dwf8", "_rdfjFSFKMY"]
        ),
        2
      )
    );

    return workout;
  }

  private pause() {
    clearInterval(this.exerciseTrackingInterval);
    this.workoutPaused = true;
  }
  private resume() {
    this.startExerciseTimeTracking();
    this.workoutPaused = false;
  }

  /**
   * pauseResumeToggle
   */
  public pauseResumeToggle() {
    if (this.workoutPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  /**
   * onKeyPressed
   */
  public onKeyPressed(event: KeyboardEvent) {
    if (event.which === 80 || event.which === 112) {
      // 'p' or 'P' key to toggle pause and resume.
      this.pauseResumeToggle();
    }
  }
}