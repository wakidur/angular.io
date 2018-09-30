import { Component, OnInit } from "@angular/core";
import { filter } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  private showHistoryLink = true;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.showHistoryLink = !e.url.startsWith("/workout");
      });
  }

  ngOnInit() {}
}
