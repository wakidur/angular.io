import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { GuessthenumberComponent } from "./guessthenumber/guessthenumber.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard" }
  },
  { path: "heroes", component: HeroesComponent, data: { title: "Dashboard" } },
  {
    path: "detail/:id",
    component: HeroDetailComponent,
    data: { title: "Hero Detail" }
  },
  {
    path: "guessthenumber",
    component: GuessthenumberComponent,
    data: { title: "Guess the number" }
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
