/**
 * Frameworks dependency
 * */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/**
 * Application dependency Module
 */
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

/**
 * Application Service List
 */

import { RoleWiseResourcePermissionGuard } from "./user-management/role-wise-resource-permission/role-wise-resource-permission.guard";

/**
 * Application Components List
 * */
import { TopMenuComponent } from "./top-menu/top-menu.component";
import { LeftSidebarMenuComponent } from "./left-sidebar-menu/left-sidebar-menu.component";
import { RightSettingMenuComponent } from "./right-setting-menu/right-setting-menu.component";
import { FooterComponent } from "./footer/footer.component";

import { DashboardComponent } from "./dashboard.component";
import { ListOfRoleComponent } from "./user-management/list-of-role/list-of-role.component";
import { ListOfResourceComponent } from "./user-management/list-of-resource/list-of-resource.component";
import { UserRolesComponent } from "./user-management/user-roles/user-roles.component";
import { RoleWiseResourcePermissionComponent } from "./user-management/role-wise-resource-permission/role-wise-resource-permission.component";
import { DeshboardContainerComponent } from "./deshboard-container/deshboard-container.component";
import { UserComponent } from "./user-management/user/user.component";
import { ProductComponent, FilterProductPipe } from "./e-commerce/product/product.component";
import { StarRatingComponent } from "./e-commerce/product/star-rating/star-rating.component";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [
    TopMenuComponent,
    LeftSidebarMenuComponent,
    RightSettingMenuComponent,
    FooterComponent,
    DashboardComponent,
    ListOfRoleComponent,
    ListOfResourceComponent,
    UserRolesComponent,
    RoleWiseResourcePermissionComponent,
    DeshboardContainerComponent,
    UserComponent,
    ProductComponent,
    StarRatingComponent,
    FilterProductPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule
  ],
  providers: [RoleWiseResourcePermissionGuard]
})
export class DashboardModule {}
