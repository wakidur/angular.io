import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-exercise-description",
  templateUrl: "./exercise-description.component.html",
  styles: []
})
export class ExerciseDescriptionComponent implements OnInit {
  @Input()
  description: string;
  @Input()
  steps: string;

  constructor() {}

  ngOnInit() {}
}
