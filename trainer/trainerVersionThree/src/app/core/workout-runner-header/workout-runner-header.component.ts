import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { pipe } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-workout-runner-header",
  templateUrl: "./workout-runner-header.component.html",
  styles: []
})
export class WorkoutRunnerHeaderComponent implements OnInit {
  public showHistoryLink = true;
  public showWorkoutLink = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.showHistoryLink = !e.url.startsWith("/workout");
        this.showWorkoutLink = e.url.startsWith("/workout");
      });
  }
  ngOnInit() {}
}
