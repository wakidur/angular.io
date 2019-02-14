/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

/**
 * Application dependency Module
 *
 * UserRoutingModule
 * SharedModule
 */
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";

/**
 * Application Component List
 *
 * UserComponent
 * SignUpComponent
 * UserProfileComponent
 * SignInComponent
 *
 */
import { UserComponent } from "./user.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./sign-in/sign-in.component";

@NgModule({
  declarations: [
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {}
