import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: []
})
export class DashboardComponent implements OnInit {
  leftSlideNavtoggle = false;
  rightSlideNavtoggle = false;
  constructor() {}

  ngOnInit() {}

  /**
   * toggleLeftSlideNav
   */
  public toggleLeftSlideNav() {
    this.leftSlideNavtoggle = !this.leftSlideNavtoggle;
  }

  /**
   * toggleRightSlideNav
   */
  public toggleRightSlideNav() {
    this.rightSlideNavtoggle = !this.rightSlideNavtoggle;
  }
}
