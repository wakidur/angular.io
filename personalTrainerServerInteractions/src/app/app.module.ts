import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { StartComponent } from "./start/start.component";
import { WorkoutHistoryComponent } from "./workout-history/workout-history.component";
import { WorkoutRunnerModule } from "./workout-runner/workout-runner.module";
import { FinishComponent } from "./finish/finish.component";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    WorkoutHistoryComponent,
    FinishComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    WorkoutRunnerModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
