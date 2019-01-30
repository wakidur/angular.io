/**
 * Frameworks dependency
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Validators,
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";

/**
 * Application dependency
 */
import { Exercise } from "../../core/model/workoutModel";
import { ExerciseBuilderService } from "../builder-services/exercise-builder.service";
import { AlphaNumericValidator, AlphaNumericValidatorCustome } from "../../shared/alphanumeric-validator";
// import {  } from "module";

@Component({
  selector: "app-exercise",
  templateUrl: "./exercise.component.html",
  styles: []
})
export class ExerciseComponent implements OnInit, OnDestroy {
  public exercise: Exercise;
  public submitted: boolean;
  public exerciseForm: FormGroup;
  public model: any;
  public video: any;
  public sub: any;
  public videoArray: FormArray = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private exerciseBuilderService: ExerciseBuilderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.sub = this.route.data.subscribe((data: { exercise: Exercise }) => {
      this.exercise = data.exercise;
    });
    this.buildExerciseForm();
  }

  private buildExerciseForm() {
    this.exerciseForm = this.formBuilder.group({
      name: [ this.exercise.name,  {
        updateOn: "blur",
        Validators: [Validators.required, AlphaNumericValidator.invalidAlphaNumeric] } ],
      title: [this.exercise.title, Validators.required],
      description: [this.exercise.description, Validators.required],
      image: [this.exercise.image, Validators.required],
      nameSound: [this.exercise.nameSound],
      procedure: [this.exercise.procedure],
      videos: this.addVideoArray()
    });
  }

  private addVideoArray(): FormArray {
    if (this.exercise.videos) {
      this.exercise.videos.forEach((video: any) => {
        this.videoArray.push(new FormControl(video, Validators.required));
      });
    }
    return this.videoArray;
  }

  private mapFormValues(form: FormGroup) {
    this.exercise.name = form.controls["name"].value;
    this.exercise.title = form.controls["title"].value;
    this.exercise.description = form.controls["description"].value;
    this.exercise.image = form.controls["image"].value;
    this.exercise.nameSound = form.controls["nameSound"].value;
    this.exercise.procedure = form.controls["procedure"].value;
    this.exercise.videos = form.controls["videos"].value;
  }

  /**
   * onSubmit
   */
  public onSubmit(formExercise: FormGroup) {
    this.submitted = true;
    if (!formExercise.valid) {
      return;
    }
    this.mapFormValues(formExercise);
    console.log(formExercise.value);
    this.exerciseBuilderService.saveExercise();
    this.router.navigate(["/builder/exercises"]);
  }

  /**
   * delete
   */
  public delete() {
    this.exerciseBuilderService.deleteExercise();
    this.router.navigate(["/builder/exercises"]);
  }

  /**
   * addVideo
   */
  public addVideo() {
    this.exerciseBuilderService.addExerciseVideo();
    const videoArray = <FormArray>this.exerciseForm.controls["videos"];
    videoArray.push(new FormControl("", Validators.required));
  }

  /**
   * canDeleteExercise
   */
  public canDeleteExercise() {
    this.exerciseBuilderService.canDeleteExercise();
  }

  /**
   * deleteVideo
   */
  public deleteVideo(index: number) {
    this.exerciseBuilderService.deleteExerciseVideo(index);
    const vidArray = <FormArray>this.exerciseForm.controls["videos"];
    vidArray.removeAt(index);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
