/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from "rxjs";
/**
 * Application dependency
 */
import { UserService } from "../../../core/user.service";
import { AlertNotificationsService } from "../../../core/alert-notifications.service";
import { User } from "../../../core/model/user.model";
import { throwIfEmpty } from "rxjs/operators";
import { mimeType } from "../../../shared/mime-type.validator";

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



  getAllUsersData: Array<User> = [];
  usersUpdated = new Subject<Array<User>>();
  form: FormGroup;
  imagePreview: any;
  private mode = "create";
  user: User;

  constructor(
    private userService: UserService,
    private alertNotificationsService: AlertNotificationsService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }),
      userImage: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
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
        this.getAllUsersData = x;
        this.usersUpdated.next([...this.getAllUsersData]);
      },
      err => {
        this.tableDataNotFound = true;
        this.alertNotificationsService.errorAlert(err.error.message);
      }
    );
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ userImage: file });
    this.form.get("userImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  /**
   * onSubmit(signUpForm)
   */
  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const objectValue = {
      fullname: this.form.value.fullname,
      email: this.form.value.email,
      password: this.form.value.password,
      userImage: this.form.value.userImage
    };
    console.log(objectValue);
    this.userService.createUser(objectValue).subscribe(
      res => {
        if (res["message"]) {
          this.alertNotificationsService.infoAlert(res["message"]);
        } else {
          this.alertNotificationsService.successAlert("Success save");
          this.getAllUser();
          this.form.reset();
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
    console.log(item);
    if (item._id) {
      this.mode = "edit";
      this.userService.getUserAccountById(item._id).subscribe(
        selected => {
          this.user = {
            _id: selected._id,
            fullname: selected.fullname,
            email: selected.email,
            userImage: selected.userImage,
            password: selected.password,
          }
          this.form.setValue({
            fullname: this.user.fullname,
            email: this.user.email,
            userImage: this.user.userImage,
            password: this.user.password
          });
        });
    } else {
      this.mode = "create";
    }

  }


  private getPostUpdateListener() {
    return this.usersUpdated.asObservable();
  }
}
