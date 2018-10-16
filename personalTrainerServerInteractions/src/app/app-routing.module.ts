import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { StartComponent } from "./start/start.component";


/**
 * Apps route entry
 */

const routes: Routes = [
  {path: 'start', component: StartComponent},
  {path: '**', redirectTo: '/start'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
