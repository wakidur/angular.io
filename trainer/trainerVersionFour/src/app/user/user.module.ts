/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

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

/**
 * Application Service List
 *
 */

import { AuthInterceptor } from "../auth/auth.interceptor";

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
    SharedModule,
    CoreModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class UserModule {}
