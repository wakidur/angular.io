import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { User, Login, ListOfRoles, SearchName } from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";



@Component({
  selector: "app-user-roles",
  templateUrl: "./user-roles.component.html",
  styles: []
})
export class UserRolesComponent implements OnInit {
  users: Array<User>;
  listOfRoles: Array<ListOfRoles>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUserByObservable().subscribe(
      x => {
        console.log(x);
        this.users = x;
      },
      err => {
        console.error(err);
      }
    );

    this.userService.getListOfUserRoles().subscribe(
      x => {
        console.log(x);
        this.listOfRoles = x;
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * userRoleSubmit
   */
  public userRoleSubmit(value: NgForm) {
    console.log(value.value);

  }
}
