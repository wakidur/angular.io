import { Component, OnInit } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { DialogRef, ModalComponent, CloseGuard } from "ngx-modialog";
import { BSModalContext } from "ngx-modialog/plugins/bootstrap";


// Workout log entry model
import { WorkoutLogEntry, WorkoutLogEntryForm } from "../../core/model/workoutLogEntryModel";


@Component({
  selector: "app-workout-history-dialog",
  templateUrl: "./workout-history-dialog.component.html",
  styles: []
})
export class WorkoutHistoryDialogComponent implements OnInit {
  historyItem: Array<WorkoutLogEntry> = [];
  historyItemDeleteValue: WorkoutLogEntry;
  historyItemUpdateValue: WorkoutLogEntry;
  modelUpdate = new WorkoutLogEntryForm;


  constructor(
    public dialog: DialogRef<WorkoutHistoryDialogContext>,
    public editItem: DialogRef<WorkoutHistoryEditItemContext>,
    public  deleteItem: DialogRef<WorkoutHistoryDeleteItemDialogContext>,
    ) {}

  ngOnInit() {
    this.historyItem = this.dialog.context.videoId;
    this.historyItemDeleteValue = this.deleteItem.context.deleteItem;
    this.historyItemUpdateValue = this.editItem.context.editItem;

    this.modelUpdate.completed = this.editItem.context.editItem.completed;
    this.modelUpdate.endedOn = this.editItem.context.editItem.endedOn;
    this.modelUpdate.exercisesDone = this.editItem.context.editItem.exercisesDone;
    this.modelUpdate.lastExercise = this.editItem.context.editItem.lastExercise;
    this.modelUpdate.startedOn = this.editItem.context.editItem.startedOn;
  }

  /**
   * ok
   */
  public ok() {
    this.dialog.close();
  }

  /**
   * onSubmit
   */
  public onSubmit() {

  }
}

export class WorkoutHistoryDialogContext extends BSModalContext {
  constructor(public videoId: Array<WorkoutLogEntry>) {
    super();
    this.size = "lg";
    this.isBlocking = true;
    this.dialogClass = "modal-dialog";
    this.keyboard = 27;
    this.message = "Hello world";
  }
}
export class WorkoutHistoryEditItemContext extends BSModalContext {
  constructor(public editItem: WorkoutLogEntry) {
    super();
    this.size = "lg";
    this.isBlocking = true;
    this.dialogClass = "modal-dialog";
    this.keyboard = 27;
    this.message = "Hello world";
  }
}
export class WorkoutHistoryDeleteItemDialogContext extends BSModalContext {
  constructor(public deleteItem: WorkoutLogEntry) {
    super();
    this.size = "lg";
    this.isBlocking = true;
    this.dialogClass = "modal-dialog";
    this.keyboard = 27;
    this.message = "Hello world";
  }
}


