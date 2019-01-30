import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

import {
  WorkoutHistoryDialogComponent,
  WorkoutHistoryDialogContext,
  WorkoutHistoryEditItemContext,
  WorkoutHistoryDeleteItemDialogContext
} from "./workout-history-dialog/workout-history-dialog.component";
import { Modal } from "ngx-modialog/plugins/bootstrap";
import { overlayConfigFactory, Overlay } from "ngx-modialog";

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

  constructor(
    private tracker: WorkoutHistoryTrackerService,
    private location: Location,
    private modal: Modal
  ) {}

  ngOnInit() {
    this.historyitems = this.tracker.getHistory();
    console.log(this.historyitems);
  }

  /**
   * goBack
   */
  public goBack() {
    this.location.back();
  }

  /**
   * historyItemUpdate
   */
  public historyItemUpdate(editItem: WorkoutLogEntry) {
    this.modal.open(
      WorkoutHistoryDialogComponent,
      overlayConfigFactory(new WorkoutHistoryEditItemContext(editItem))
    );
  }

  /**
   * historyItemDelete
   */
  public historyItemDelete(deleteItem: WorkoutLogEntry) {
    this.modal.open(
      WorkoutHistoryDialogComponent,
      overlayConfigFactory(new WorkoutHistoryDeleteItemDialogContext(deleteItem))
    );
  }
  /**
   * viewModal
   */
  public viewModal() {
    this.modal.open(
      WorkoutHistoryDialogComponent,
      overlayConfigFactory(new WorkoutHistoryDialogContext(this.historyitems))
    );
  }
}
