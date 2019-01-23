/**
 * Frameworks dependency
 */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";


/**
 * Application dependency Module
 * AppRoutingModule
 * CoreModule
 * SharedModule
 * WorkoutRunnerModule
 */
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { WorkoutRunnerModule } from "./workout-runner/workout-runner.module";

/**
 * Application Components List
 *
 * AppComponent
 * StartComponent
 * FinishComponent
 * DashboardComponent
 * WorkoutHistoryComponent
 * WorkoutHistoryDialogComponent
 */
import { AppComponent } from "./app.component";
import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WorkoutHistoryComponent } from "./workout-history/workout-history.component";
import { WorkoutHistoryDialogComponent } from "./workout-history/workout-history-dialog/workout-history-dialog.component";


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent,
    DashboardComponent,
    WorkoutHistoryComponent,
    WorkoutHistoryDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    WorkoutRunnerModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [
    WorkoutHistoryDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
