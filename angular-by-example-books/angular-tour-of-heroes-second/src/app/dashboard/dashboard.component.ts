import { Component, OnInit } from "@angular/core";

import { HeroModel, Hero } from "../core/model/heroModel";
import { HeroService } from "../core/hero.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  heroesModel: HeroModel[] = [];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  /**
   * getHeroes
   */
  public getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroesModel = heroes.slice(1, 5)));
  }
}
