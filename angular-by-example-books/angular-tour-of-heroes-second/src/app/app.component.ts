import { Component, OnInit } from "@angular/core";
// Title Service
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

import { pipe } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit() {
    this.titleService.setTitle("My awesom app");
    // step - 1
    /*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(`NavigationEnd: , ${event}`);
      }
    });
*/
    // step - 2
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === "primary"),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        console.log(`NavigationEnd: , ${event["title"]}`);
        this.titleService.setTitle(event["title"]);
      });
  }
}
