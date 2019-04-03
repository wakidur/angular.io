import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
/**
 * Application
 */

import { UserService } from "../../core/user.service";
import { UserProfile, UserProfileForm } from "../../core/model/user.model";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styles: []
})
export class UserProfileComponent implements OnInit {
  public userDetails = new UserProfileForm("", "");

  // public userProfileForm: UserProfileForm;
  public roleStatus: boolean = false;
  public userProfileForm = new UserProfileForm("", "");

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        if (res["user"]["role"]) {
          console.log(res["user"]);
          console.log("FullName " + res["user"].fullname);
          this.roleStatus = true;
          this.userDetails = res["user"];
          this.userProfileForm.fullname = res["user"].fullname;
          console.log("user profile name " + this.userProfileForm);
          this.userProfileForm.email = res["user"].email;
        } else {
          console.log(res["user"]);
          this.roleStatus = false;
          this.userDetails = res["user"];
          console.log("FullName " + res["user"].fullname);
          this.userProfileForm.fullname = res["user"].fullname;
          console.log("user profile name " + this.userProfileForm);
          this.userProfileForm.email = res["user"].email;
        }
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

  /**
   * profileSubmit
   */
  public profileSubmit(formObj: NgForm) {
    if (formObj.valid) {
      console.log(formObj.value);
      this.userService.postUserProfile(formObj.value).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      console.log("not valid");
    }
  }
}
