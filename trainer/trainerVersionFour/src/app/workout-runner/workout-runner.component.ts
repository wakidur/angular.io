// Framework Dependencies
import { Component,  OnInit,  OnDestroy } from "@angular/core";




@Component({
  selector: "app-workout-runner",
  templateUrl: "./workout-runner.component.html",
  styles: []
})
export class WorkoutRunnerComponent implements OnInit, OnDestroy {

  /**
   * we register the Router service by importing the RouterModule into AppRoutingModule
   * @ param router
   * @ param tracker
   */
  constructor() {}

  ngOnDestroy() {
  }
  ngOnInit() {}


}
