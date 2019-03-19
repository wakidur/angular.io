import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

import { UserService } from "../../../core/user.service";

@Component({
  selector: "app-top-nav-main",
  templateUrl: "./top-nav-main.component.html",
  styles: []
})
export class TopNavMainComponent implements OnInit {
  constructor(private router: Router,
    private userService: UserService) {}

  ngOnInit() {}
  /**
   * onLogout
   */
  public onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/home"]);
  }
}
