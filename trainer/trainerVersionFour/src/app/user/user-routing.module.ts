/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * Application Component List
 *
 * UserComponent
 * SignUpComponent
 * UserProfileComponent
 * SignInComponent
 */
import { UserComponent } from "./user.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SignInComponent } from "./sign-in/sign-in.component";

/**
 * Application service List
 *
*/
import { AuthGuard } from "../auth/auth.guard";


const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "sign-in"
      },
      {
        path: "sign-up",
        component: SignUpComponent,
        data: { title: "Sign Up" }
      },
      {
        path: "sign-in",
        component: SignInComponent,
        data: { title: "Sign In" }
      },
      {
        path: "user-profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard],
        data: { title: "User Profile" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
