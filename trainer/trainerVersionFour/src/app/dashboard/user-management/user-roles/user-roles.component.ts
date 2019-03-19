import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";

import {
  User,
  Login,
  ListOfRoles,
  SearchName,ListOfResource
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
  listOfRoles = [];
  form: FormGroup;
  userRole = [];

  public search: any;
  public listofrole: ListOfResource[];
  public listOfEdit: ListOfResource;
  public message: string;
  public errorOfRoles: string;
  public successFrom: string;

  public formSubmint: ListOfResource =  { name: "", _id: "" };
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
      listOfRoles: new FormArray([]),
      user: new FormControl()
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
      const control = new FormControl( !o.name.indexOf("guest") );
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
  public submit() {
    const selectedOrderIds = this.form.value.listOfRoles
      .map((v, i) => (v ? this.listOfRoles[i]._id : null))
      .filter(v => v !== null);
    const postObject = {
      user_id: this.form.value.user._id,
      role_id: selectedOrderIds,
    };
    this.userService.postUserRole(postObject).subscribe(
      x => {
        this.alertNotificationsService.successAlert(x);
        this.getUserRole();
      },
      err => {
        this.alertNotificationsService.errorAlert(err);
      },

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
