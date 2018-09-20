import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { WorkoutRunnerModule } from "./workout-runner/workout-runner.module";
import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [AppComponent, StartComponent, FinishComponent],
  imports: [AppRoutingModule, BrowserModule, WorkoutRunnerModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
