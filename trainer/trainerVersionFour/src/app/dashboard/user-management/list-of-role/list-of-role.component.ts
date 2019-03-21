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
import {
  ListOfRoles,
  ListOfUserRoles,
  SearchName
} from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";
import { AlertNotificationsService } from "../../../core/alert-notifications.service";

@Component({
  selector: "app-list-of-role",
  templateUrl: "./list-of-role.component.html",
  styles: []
})
export class ListOfRoleComponent implements OnInit, OnDestroy, AfterViewInit {
  public search: any;
  public listofrole: ListOfUserRoles[];
  public listOfEdit: ListOfUserRoles;
  public message: string;
  public errorOfRoles: string;
  // public successFrom: string;

  public formSubmint = new ListOfUserRoles("", "");
  public searchObject = new SearchName();
  public tableDataNotFound: boolean = false;
  public isResetShow: boolean = false;
  public isAlert: boolean = false;

  constructor(
    private userService: UserService,
    private alertNotificationsService: AlertNotificationsService
  ) {}

  ngOnInit() {
    this.getUserRole();
  }

  ngAfterViewInit() {}
  /**
   * getUserRole
   */
  public getUserRole() {
    this.tableDataNotFound = false;
    this.userService.getListOfUserRoles().subscribe(
      x => {
        this.tableDataNotFound = !x.length ? true : false;
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
              this.alertNotificationsService.infoAlert(
                "Already exists please choose another"
              );
            } else {
              this.userService.postListOfUserRole(name.value).subscribe(
                x => {
                  // this.successFrom = x;
                  this.alertNotificationsService.successAlert(x);
                  this.isAlert = true;
                  this.getUserRole();
                },
                err => {
                  this.alertNotificationsService.errorAlert(err);
                  this.errorOfRoles = err;
                },
                () => console.log(`Observer got a complete notification`)
              );
            }
          },
          err => {
            this.errorOfRoles = err;
            this.alertNotificationsService.errorAlert(err);
          }
        );
      } else {
        this.message = "Name Field requred";
      }
    } else {
      if (name.valid) {
        if (this.listOfEdit.name === name.value.name) {
          this.alertNotificationsService.infoAlert(
            "You did not modify the user role"
          );
        } else {
          this.userService.getListOfUserRoleByName(name.value.name).subscribe(
            res => {
              if (res) {
                this.alertNotificationsService.infoAlert(
                  "Already exists please choose another"
                );
              } else {
                const editValue = {
                  _id: this.listOfEdit._id,
                  name: name.value.name
                };
                this.userService.updateListOfUserRole(editValue).subscribe(
                  x => {
                    this.alertNotificationsService.successAlert(x);
                    this.getUserRole();
                  },
                  err => {
                    this.alertNotificationsService.errorAlert(err);
                  },
                  () => console.log(`Observer got a complete notification`)
                );
              }
            },
            err => {
              this.alertNotificationsService.errorAlert(err);
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
    this.userService.deleteListOfUserRole(delContactId).subscribe(
      res => {
        this.alertNotificationsService.infoAlert(res);
        this.getUserRole();
      },
      err => {
        this.alertNotificationsService.errorAlert(err);
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
    if (searchValue.length > 0) {
      this.isResetShow = true;
    } else {
      this.isResetShow = false;
    }
    this.searchObject.name = searchValue;
    this.userService.searchRoleByName(this.searchObject).subscribe(
      result => {
        if (result.length === 0) {
          this.tableDataNotFound = true;
          this.listofrole = null;
        } else if (result.name === "not found") {
          this.tableDataNotFound = true;
          this.listofrole = null;
        } else {
          this.tableDataNotFound = false;
          this.listofrole = result;
        }
      },
      err => {
        this.message = err;
      }
    );
  }

  /**
   * searchReset
   */
  public searchReset(value: string) {
    console.log(value);
    this.search = "";
    this.isResetShow = false;
    this.getUserRole();
  }

  /**
   * searchForValue
   */
  public searchForValue(search: string) {
    this.searchObject.name = search;
    this.userService.searchRoleByName(this.searchObject).subscribe(
      result => {
        if (result.length === 0) {
          this.tableDataNotFound = true;
          this.listofrole = null;
        } else if (result.name === "not found") {
          this.tableDataNotFound = true;
          this.listofrole = null;
        } else {
          this.tableDataNotFound = false;
          this.listofrole = result;
        }
      },
      err => {
        this.message = err;
      }
    );
  }

  /**
   * isAlertClick
   */
  public isAlertClick() {}
  ngOnDestroy(): void {}
}
