// import Frameworks dependency
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import app dependency

import { WorkoutRunnerComponent } from "./workout-runner/workout-runner.component";
import { StartComponent } from "./start/start.component";
import { FinishComponent } from "./finish/finish.component";

/**
 * Routes (use configurations)
 * The routes variable is an array of Route objects.
 * Each Route defines the configuration of a single route, which contains
 * path: The target path to match
 * component: The component to be loaded when the path is hit
 * A path with ** denotes a catch-all path or the wildcard route for our app.
 * Any navigation that does not match one of the first three routes matches the catch-all route,
 * causing the app to navigate to the start page (defined in the redirectTo property).
 */
const routes: Routes = [
  { path: "start", component: StartComponent },
  { path: "workout", component: WorkoutRunnerComponent },
  { path: "finish", component: FinishComponent },
  { path: "**", redirectTo: "/start" }
];

/**
 * The enableTracing: true property on the forRoot function parameter allows us to monitor
 * the router events (such as NavigationStart, NavigationEnd,
 * and NavigationCancel) that happen when navigation takes place and the
 * correct route is resolved.
 * The logs are visible in the browser's debugger console.
 * Use it for debugging purposes only, remove it from production builds.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
