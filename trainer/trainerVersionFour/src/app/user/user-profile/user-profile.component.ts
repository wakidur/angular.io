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
          console.log("role" + res["user"]);
          this.roleStatus = true;
          this.userDetails = res["user"];
          this.userProfileForm.fullname = res["user"].fullname;
          this.userProfileForm.email = res["user"].email;
          this.userProfileForm.designation = res["user"].designation;
          this.userProfileForm.address = res["user"].address;
          this.userProfileForm.country = res["user"].country;
          this.userProfileForm.city = res["user"].city;
          this.userProfileForm.mobile = res["user"].mobile;
          this.userProfileForm.phone = res["user"].phone;
          this.userProfileForm.birthofdate = res["user"].birthofdate;
          this.userProfileForm.zip = res["user"].zip;
        } else {
          this.roleStatus = false;
          this.userDetails = res["user"];
          if (res["user"]) {
            console.log("no role" + res["user"]);
              this.userProfileForm.fullname = res["user"].fullname;
              this.userProfileForm.email = res["user"].email;
              this.userProfileForm.designation = res["user"].designation;
              this.userProfileForm.address = res["user"].address;
              this.userProfileForm.country = res["user"].country;
              this.userProfileForm.city = res["user"].city;
              this.userProfileForm.mobile = res["user"].mobile;
              this.userProfileForm.phone = res["user"].phone;
              this.userProfileForm.birthofdate = res["user"].birthofdate;
              this.userProfileForm.zip = res["user"].zip;
          }
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
