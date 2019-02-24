import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Application
 */

import { UserService } from "../../core/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styles: []
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res["user"];
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/user/sign-in"]);
  }
}
