import { Component, OnInit } from "@angular/core";

import { Hero } from "../core/model/heroModel";
import { HeroService } from "../core/hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.scss"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {}

  /**
   * getHeroes
   */
  public getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  /**
   * addHeroe
   */
  public addHeroe(name: string): void {
    name = name.trim();
    if (!name) {return ;}
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes.push(hero));
  }
}
