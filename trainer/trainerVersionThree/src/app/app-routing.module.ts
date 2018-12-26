// import Frameworks dependency
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import app dependency

import { DashboardComponent } from "./dashboard/dashboard.component";
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
  { path: "dashboard", component: DashboardComponent },
  { path: "**", redirectTo: "/start" }
];

/**
 * The enableTracing: true property on the forRoot function parameter allows us to monitor
 * the router events (such as NavigationStart, NavigationEnd,
 * and NavigationCancel) that happen when navigation takes place and the
 * correct route is resolved.
 * The logs are visible in the browser's debugger console.
 * Use it for debugging purposes only, remove it from production builds.
 *
 * To change it to hash-based routing, the route configuration for the top-level routes should be augmented
 * with an extra useHash:true property in the RouterModule.forRoot function (second parameter).
 *
 * Notice the / prefix in the preceding route path. / is used to specify an absolute path.
 * The Angular router also supports relative paths, which are useful when working with child routes.
 * We will explore the concept of child routes in the next few chapters.
 * <a ... href="/workout">
 *
 * Avoid hardcoding route links
 * While you could have directly used <a href="/workout">,
 * prefer routerLink to avoid hardcoding routes
 *
 * it supports ....
 * child routes
 * async routes
 * lifecycle hooks
 * secondary routes
 * some other advanced scenarios

 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
