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
import { WorkoutHistoryTrackerServerInteractionsService } from "../core/workout-history-tracker-server-interactions.service";
import { UserService } from "../core/user.service";

@Component({
  selector: "app-workout-history",
  templateUrl: "./workout-history.component.html",
  styles: []
})
export class WorkoutHistoryComponent implements OnInit {
  historyitems: Array<WorkoutLogEntry> = [];
  historyLogitems: Array<WorkoutLogEntry> = [];
  completed: boolean;
  public isLogInUser: boolean;

  constructor(
    private tracker: WorkoutHistoryTrackerService,
    private trackerSI: WorkoutHistoryTrackerServerInteractionsService,
    private location: Location,
    private modal: Modal,
    private userService: UserService

  ) {}

  ngOnInit() {
    this.isLogInUser = this.userService.isLoggedIn();
    if (!this.isLogInUser) {
      this.historyitems = this.tracker.getHistory();
    } else {
      this.trackerSI.getHistoryByObservable().subscribe(
        historyLogitem => {
          if (historyLogitem) {
            this.historyLogitems = historyLogitem;
          }
        },
        (err: any) => {console.error(err)}
      );
    }
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
      overlayConfigFactory(
        new WorkoutHistoryDeleteItemDialogContext(deleteItem)
      )
    );
  }
  /**
   * viewModal
   */
  public viewModal() {
    this.modal.open(
      WorkoutHistoryDialogComponent,
      overlayConfigFactory(new WorkoutHistoryDialogContext(this.historyLogitems))
    );
  }
}
