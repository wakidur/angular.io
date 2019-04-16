/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


/**
 * Application dependency Module
 *
 * UserRoutingModule
 * SharedModule
 */
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { AuthModule } from "../auth/auth.module";

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
import { LoaderModule } from "../loader/loader.module";



@NgModule({
  declarations: [
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    CoreModule,
    AuthModule,
    LoaderModule
  ],
  providers: []
})
export class UserModule {}
