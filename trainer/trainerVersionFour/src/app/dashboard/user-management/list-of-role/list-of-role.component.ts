/**
 * Frameworks dependency
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
/**
 * Application dependency
 *
 */
import { ListOfRoles } from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-list-of-role",
  templateUrl: "./list-of-role.component.html",
  styles: []
})
export class ListOfRoleComponent implements OnInit, OnDestroy {
  listOfRoles: ListOfRoles;
  listOfEdit: ListOfRoles;
  message: string;
  errorOfRoles;
  successFrom;
  formSubmint = {
    name: ""
  };
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserRole();
  }
  /**
   * getUserRole
   */
  public getUserRole() {
    this.userService
      .getListOfUserRoles()
      .subscribe(
        x => {
          this.listOfRoles = x;
          // this.listOfEdit = x;
        },
        err => (this.errorOfRoles = err),
        () => console.log("Observer got a complete notification")
      );
  }

  /**
   * roleSubmit
   */
  public roleSubmit(name: NgForm) {
  if (!this.listOfEdit) {
    if (name.valid) {
      this.userService.postListOfUserRole(name.value).subscribe(
        x => {
          this.successFrom = x;
          this.getUserRole();
        },
        err => (this.errorOfRoles = err),
        () => console.log(`Observer got a complete notification`)
      );
    } else {
      console.log("invalie ");
    }
  } else {
    if (name.valid) {
      if (this.listOfEdit.name === name.value.name) {
        this.message = "same name not modify";
      } else {
        const editValue = {
          _id: this.listOfEdit._id,
          name: name.value.name
        };
        this.userService.updateListOfUserRole(editValue).subscribe(
          x => {
            this.successFrom = x;
            this.getUserRole();
          },
          err => (this.errorOfRoles = err),
          () => console.log(`Observer got a complete notification`)
        );
      }

    } else {

    }

  }

  }

  /**
   * deleteRole
   */
  public deleteRole(deleteItem) {

  }

  /**
   * updateRole
   */
  public updateRole(editItem) {
    this.listOfRoles = {
      _id: editItem._id,
      name: editItem.name
    };
    this.listOfEdit = {
      _id: editItem._id,
      name: editItem.name
    };
  }

  ngOnDestroy(): void {}
}
