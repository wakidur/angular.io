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

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WorkoutRunnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
