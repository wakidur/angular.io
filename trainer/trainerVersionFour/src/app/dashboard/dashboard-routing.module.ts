/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


/**
 * Application Component List
*/

import { DashboardComponent } from "./dashboard.component";
import { DeshboardContainerComponent } from "./deshboard-container/deshboard-container.component";
import { UserComponent } from "./user-management/user/user.component";
import { ListOfRoleComponent } from "./user-management/list-of-role/list-of-role.component";
import { ListOfResourceComponent } from "./user-management/list-of-resource/list-of-resource.component";
import { UserRolesComponent } from "./user-management/user-roles/user-roles.component";
import { RoleWiseResourcePermissionComponent } from "./user-management/role-wise-resource-permission/role-wise-resource-permission.component";

/**
 * Application Service List
 *
 * WorkoutBuilderService
 */
import { RoleWiseResourcePermissionGuard } from "./user-management/role-wise-resource-permission/role-wise-resource-permission.guard";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "deshboare-container"
      },
      {
        path: "deshboare-container",
        component: DeshboardContainerComponent,
        data: { title: "Dashboard" }
      },
      {
        path: "user",
        component: UserComponent,
        data: { title: "User" }
      },
      {
        path: "list-of-roles",
        component: ListOfRoleComponent,
        data: { title: "List Of Role" }
      },
      {
        path: "list-of-resources",
        component: ListOfResourceComponent,
        data: { title: "List Of Resource" }
      },
      {
        path: "user-roles",
        component: UserRolesComponent,
        data: { title: "User Roles" }
      },
      {
        path: "role-wise-resource-permission",
        component: RoleWiseResourcePermissionComponent,
        resolve: {listOfResource: RoleWiseResourcePermissionGuard },
        data: { title: "Role Wise Resource Permission" }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
