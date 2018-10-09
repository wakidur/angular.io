import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";
import { WorkoutHistoryComponent } from "./workout-history/workout-history.component";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { WorkoutRunnerModule } from "./workout-runner/workout-runner.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    FinishComponent,
    WorkoutHistoryComponent
  ],
  imports: [
    BrowserModule,
    WorkoutRunnerModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
