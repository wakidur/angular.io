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
  public showBuilderLink = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.url.startsWith("/workout")) {
          this.showHistoryLink = !e.url.startsWith("/workout");
          this.showWorkoutLink = !e.url.startsWith("/workout");
        } else if (e.url.startsWith("/history")) {
          this.showHistoryLink = !e.url.startsWith("/history");
          this.showWorkoutLink = !e.url.startsWith("/workout");
        } else if (e.url.startsWith("/builder")) {
          this.showBuilderLink = !e.url.startsWith("/builder");
        } else {
        }
      });
  }
  ngOnInit() {}
}
