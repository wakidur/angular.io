import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IconCamera, IconHeart, IconGithub, IconHome, IconFileText, IconHelpCircle } from "angular-feather";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { GuessthenumberComponent } from "./guessthenumber/guessthenumber.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroSearchComponent } from "./hero-search/hero-search.component";
import { MessagesComponent } from "./messages/messages.component";

import { CoreModule } from "./core/core.module";

const icons = [
  IconCamera,
  IconHeart,
  IconGithub,
  IconHome,
  IconFileText,
  IconHelpCircle
];
@NgModule({
  declarations: [
    AppComponent,
    GuessthenumberComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    MessagesComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, icons, CoreModule],
  exports: [icons],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
