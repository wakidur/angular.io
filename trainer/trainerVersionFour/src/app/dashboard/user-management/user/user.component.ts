/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

/**
 * Application dependency
 */
import { UserService } from "../../../core/user.service";
import { AlertNotificationsService } from "../../../core/alert-notifications.service";
import { User } from "../../../core/model/user.model";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styles: []
})
export class UserComponent implements OnInit {
  selectedUser: User = {
    fullname: "",
    email: "",
    password: ""
  };
  public tableDataNotFound: boolean = false;
  userObject: User;
  users: Array<User>;
  // Checkbox field
  termsOfUse = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService: UserService,
    private alertNotificationsService: AlertNotificationsService
  ) {}

  ngOnInit() {
    this.getAllUser();
  }

  /**
   * getAllUser
   */
  public getAllUser() {
    this.userService.getAllUserByObservable().subscribe(
      x => {
        this.tableDataNotFound = !x.length ? true : false;
        this.users = x;
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * onSubmit(signUpForm)
   */
  public onSubmit(signUpForm: NgForm) {
    console.log(signUpForm);
    const objectValue = {
      fullname: signUpForm.value.fullname,
      email: signUpForm.value.email,
      password: signUpForm.value.password
    };
    this.userService.createUser(objectValue).subscribe(
      res => {
        if (res["message"]) {
          this.alertNotificationsService.infoAlert(res["message"]);
        } else {
          this.alertNotificationsService.successAlert("Success save");
          this.getAllUser();
          this.resetForm(signUpForm);
        }
      },
      err => {
        if (err.status === 422) {

          this.alertNotificationsService.errorAlert(err.message);
        } else {

          this.alertNotificationsService.errorAlert("Something went wrong.Please contact admin.");
        }
      }
    );
  }

  public resetForm(form: NgForm) {
    this.selectedUser = {
      fullname: "",
      email: "",
      password: ""
    };
    form.resetForm();

  }

  /**
   * deleteUser
   */
  public deleteUser(item) {
    this.userService.deleteUserAccount(item).subscribe(
      res => {
        this.alertNotificationsService.infoAlert(res);
        this.getAllUser();
      },
      err => {
        this.alertNotificationsService.errorAlert(err);
      }
    );
  }

  /**
   * name
   */
  public updateUser(item) {

  }
}
