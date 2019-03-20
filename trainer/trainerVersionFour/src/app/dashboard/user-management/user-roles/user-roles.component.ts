import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";

import {
  User,
  Login,
  ListOfRoles,
  SearchName,
  ListOfResource
} from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";
import { AlertNotificationsService } from "../../../core/alert-notifications.service";
@Component({
  selector: "app-user-roles",
  templateUrl: "./user-roles.component.html",
  styles: []
})
export class UserRolesComponent implements OnInit {
  users: Array<User>;
  public submitted: boolean;
  listOfRoles = [];
  form: FormGroup;
  userRole = [];
  // user = {
  //   fullname: ""
  // };

  public search: any;
  public listofrole: ListOfResource[];
  public listOfEdit: ListOfResource;
  public message: string;
  public errorOfRoles: string;
  public successFrom: string;

  public formSubmint: ListOfResource = { name: "", _id: "" };
  public searchObject = new SearchName();
  public tableDataNotFound: boolean = false;
  public isResetShow: boolean = false;
  public isAlert: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertNotificationsService: AlertNotificationsService
  ) {
    this.form = this.formBuilder.group({
      listOfRoles: new FormArray([], minSelectedCheckboxes(1)),
      user: new FormControl("", [Validators.required])
    });

    // async orders (could be a http service call)
    this.userService.getListOfUserRoles().subscribe(
      x => {
        this.listOfRoles = x;
        this.addCheckboxes();
      },
      err => {
        console.error(err);
      }
    );
    this.userService.getAllUserByObservable().subscribe(
      x => {
        console.log(x);
        this.users = x;
      },
      err => {
        console.error(err);
      }
    );
  }

  private addCheckboxes() {
    this.listOfRoles.map((o, i) => {
      // if first item set to true, else false
      const control = new FormControl(!o.name.indexOf("guest"));
      (this.form.controls.listOfRoles as FormArray).push(control);
    });
  }

  ngOnInit() {
    this.getUserRole();
  }

  /**
   * getUserRole
   */
  public getUserRole() {
    this.tableDataNotFound = false;
    this.userService.getUserRole().subscribe(
      x => {
        // this.tableDataNotFound = !x.length ? true : false;
        this.userRole = x;
        console.log(this.userRole);
        // this.listOfEdit = x;
      },
      err => (this.errorOfRoles = err),
      () => console.log("Observer got a complete notification")
    );
  }

  /**
   * userRoleSubmit
   */
  public submit(formGroup: FormGroup) {
    const selectedOrderIds = formGroup.value.listOfRoles
      .map((v, i) => (v ? this.listOfRoles[i]._id : null))
      .filter(v => v !== null);
    const postObject = {
      user_id: formGroup.value.user._id,
      role_id: selectedOrderIds
    };

    this.userService.getUserRoleById(formGroup.value.user).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.alertNotificationsService.infoAlert(
            "This user already have role"
          );
        } else {
          this.userService.postUserRole(postObject).subscribe(
            x => {
              this.alertNotificationsService.successAlert(x);
              this.getUserRole();
            },
            error => {
              this.alertNotificationsService.errorAlert(error);
            }
          );
        }
      },
      error => {
        this.alertNotificationsService.errorAlert(error);
      },
      () => console.log("Observer got a complete notification")
    );
  }

  /**
   * deleteRole
   */
  public deleteRole(delContactId) {
    this.userService.deleteListOfResource(delContactId).subscribe(
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
    this.userService.searchResourceByName(this.searchObject).subscribe(
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
    this.userService.searchResourceByName(this.searchObject).subscribe(
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
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
