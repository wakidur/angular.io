/**
 * Frameworks dependency
 */
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

/**
 * Application dependency
 */
import { UserService } from "../../core/user.service";
import { Login } from "../../core/model/user.model";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styles: []
})
export class SignInComponent implements OnInit {
  login: Login = {
    email: "",
    password: ""
  };
  public rememberCheckBox:boolean;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  constructor(private userService: UserService, public router: Router) {}

  ngOnInit() {}

  /**
   * onSubmit
   */
  public onSubmit(singInForm: NgForm) {
    if (singInForm.valid) {
      const inputValue = {
        email: singInForm.value.email,
        password: singInForm.value.password
      };
      this.userService.logIn(inputValue).subscribe(
        res => {
          console.log("Observer got a next value: " + res["token"]);
        },
        err => {
          console.error("Observer got an error: " + err);
        },
        () => console.log("Observer got a complete notification")
      );
    } else {
      console.log("Validation error");
    }
  }
}
