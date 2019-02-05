/**
 * Frameworks dependency
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Application dependency Module
 */

@Component({
  selector: "app-workout-runner",
  templateUrl: "./workout-runner.component.html",
  styles: []
})
export class WorkoutRunnerComponent implements OnInit, OnDestroy {
  public workoutName: string;
  private sub: any;
  /**
   * we register the Router service by importing the RouterModule into AppRoutingModule
   * @ param router
   * @ param tracker
   */
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.workoutName = params["id"];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
