import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LeftSidebarMenuComponent } from './left-sidebar-menu/left-sidebar-menu.component';
import { RightSettingMenuComponent } from './right-setting-menu/right-setting-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [TopMenuComponent, LeftSidebarMenuComponent, RightSettingMenuComponent, FooterComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
