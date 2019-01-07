import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

// Workout log entry model
import { WorkoutLogEntry } from "../core/model/workoutLogEntryModel";
// Wrokout history tracken service
import { WorkoutHistoryTrackerService } from "../core/workout-history-tracker.service";

@Component({
  selector: "app-workout-history",
  templateUrl: "./workout-history.component.html",
  styles: []
})
export class WorkoutHistoryComponent implements OnInit {
  historyitems: Array<WorkoutLogEntry> = [];
  completed: boolean;
  constructor(private tracker: WorkoutHistoryTrackerService, private location: Location) {}

  ngOnInit() {
    this.historyitems = this.tracker.getHistory();
  }

  /**
   * goBack
   */
  public goBack() {
    this.location.back();
  }
}
