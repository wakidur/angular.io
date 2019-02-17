/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

/**
 * Application dependency
 */
import { UserService } from "../../core/user.service";
import { User } from "../../core/model/user.model";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styles: []
})
export class SignUpComponent implements OnInit {
  selectedUser: User = {
    fullname: "",
    email: "",
    password: "",
  };

  userObject: User;

  // Checkbox field
  termsOfUse = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  /**
   * onSubmit(signUpForm)
   */
  public onSubmit(signUpForm: NgForm) {
    console.log(signUpForm);
    const objectValue =  {
      fullname: signUpForm.value.fullname,
      email: signUpForm.value.email,
      password: signUpForm.value.password,
    };
    this.userService.createUser(objectValue).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.resetForm(signUpForm);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join("<br/>");
        } else {
          this.serverErrorMessages =
            "Something went wrong.Please contact admin.";
        }
      }
    );
  }

  public resetForm(form: NgForm) {
    this.selectedUser = {
      fullname: "",
      email: "",
      password: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
