import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// AppRoutingModule
import { AppRoutingModule } from "./app-routing.module";
// AppComponent
import { AppComponent } from "./app.component";
import { WorkoutRunnerModule } from "./workout-runner/workout-runner.module";
import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WorkoutHistoryComponent } from './workout-history/workout-history.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent,
    DashboardComponent,
    WorkoutHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WorkoutRunnerModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
