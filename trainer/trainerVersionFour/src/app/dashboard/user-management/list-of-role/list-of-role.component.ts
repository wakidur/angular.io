/**
 * Frameworks dependency
 */
import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef
} from "@angular/core";
import { NgForm } from "@angular/forms";
/**
 * Application dependency
 *
 */
import { ListOfRoles, ListOfUserRoles } from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";

@Component({
  selector: "app-list-of-role",
  templateUrl: "./list-of-role.component.html",
  styles: []
})
export class ListOfRoleComponent implements OnInit, OnDestroy, AfterViewInit {
  search: any;
  jQuery: any;
  public listofrole: ListOfUserRoles;
  public listOfEdit: ListOfUserRoles;
  public message: string;
  public errorOfRoles: string;
  public successFrom: string;
  public formSubmint = new ListOfUserRoles("", "");

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserRole();
  }

  ngAfterViewInit() {}
  /**
   * getUserRole
   */
  public getUserRole() {
    this.userService.getListOfUserRoles().subscribe(
      x => {
        this.listofrole = x;
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
        this.userService.getListOfUserRoleByName(name.value.name).subscribe(
          res => {
            if (res) {
              this.message = `Already exists please choose another`;
            } else {
              this.userService.postListOfUserRole(name.value).subscribe(
                x => {
                  this.successFrom = x;
                  this.getUserRole();
                },
                err => (this.errorOfRoles = err),
                () => console.log(`Observer got a complete notification`)
              );
            }
          },
          err => {
            this.errorOfRoles = err;
          }
        );
      } else {
        this.message = "Name Field requred";
      }
    } else {
      if (name.valid) {
        if (this.listOfEdit.name === name.value.name) {
          this.message = "You did not modify the user role";
        } else {
          this.userService.getListOfUserRoleByName(name.value.name).subscribe(
            res => {
              if (res) {
                this.message = `Already exists please choose another`;
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
            },
            err => {
              this.errorOfRoles = err;
            }
          );
        }
      }
    }
  }

  /**
   * deleteRole
   */
  public deleteRole(delContactId) {
    this.userService.deleteListOfUserRole(delContactId._id).subscribe(
      res => {
        this.message = res;
        this.getUserRole();
      },
      err => {
        this.errorOfRoles = err;
      }
    );
  }

  /**
   * updateRole
   */
  public updateRole(editItem) {
    this.formSubmint = {
      _id: editItem._id,
      name: editItem.name
    };
    this.listOfEdit = {
      _id: editItem._id,
      name: editItem.name
    };
  }

  // table data search
  /**
   * onSearchChange
   */
  public onSearchChange(searchValue: string) {
    console.log(searchValue);
  }

  /**
   * valueChange
   */
  public valuechange(newValue) {
    this.search = newValue;
    console.log(newValue);
  }

  ngOnDestroy(): void {}
}
