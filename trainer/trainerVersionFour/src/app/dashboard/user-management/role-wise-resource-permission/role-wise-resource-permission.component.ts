/**
 * Frameworks dependency
 */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {

  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  ValidatorFn,
  Validators
} from "@angular/forms";

/**
 * Application dependency
 */

import {
  ListOfResources,
  ListOfUserRoles
} from "../../../core/model/user.model";
import { UserService } from "../../../core/user.service";
import { AlertNotificationsService } from "../../../core/alert-notifications.service";

@Component({
  selector: "app-role-wise-resource-permission",
  templateUrl: "./role-wise-resource-permission.component.html",
  styles: []
})
export class RoleWiseResourcePermissionComponent implements OnInit {
  public listOfResources: Array<ListOfResources>;
  public listOfResource: ListOfResources;
  public listOfUserRoles: Array<ListOfUserRoles>;
  public submitted: boolean;
  public roleWiseResourcePermissionForm: FormGroup;
  public model: any;
  public video: any;
  public sub: any;
  // listOfResources = [];
  // userRole = [];



  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private alertNotificationsService: AlertNotificationsService,
    private formBuilder: FormBuilder
  ) {
    this.roleWiseResourcePermissionForm = this.formBuilder.group({
      listOfResources: new FormArray([]),
      userRole: new FormControl("", [Validators.required])
    });
    this.sub = this.route.data.subscribe(
      (data) => {
        this.listOfResources = data.listOfResource;
        this.addCheckboxes();
      }
    );

    this.userService.getListOfUserRoles().subscribe(
      x => {
        this.listOfUserRoles = x;
        console.log(this.listOfUserRoles)
      },
      err => {
        console.error(err);
      }
    );



  }

  ngOnInit() {
  }



  private addCheckboxes() {
    this.listOfResources.map((o, i) => {
      // if first item set to true, else false
      const control = new FormControl(!o.name.indexOf("home"));
      (this.roleWiseResourcePermissionForm.controls.listOfResources as FormArray).push(control);
    });
  }

  private mapFormValues(form: FormGroup) {
    this.listOfResource.name = form.controls["name"].value;
    this.listOfResource._id = form.controls["_id"].value;
  }


  /**
   * resourceSubmint
   */
  public resourceSubmint(formPermission: FormGroup) {
    this.submitted = true;


  const selectedOrderIds = formPermission.value.listOfResources
      .map((v, i) => (v ? this.listOfResources[i]._id : null))
      .filter(v => v !== null);
    const postObject = {
      role_id: formPermission.value.userRole._id,
      resource_id: selectedOrderIds
    };

    this.userService.getRoleWiseResourcePermissionById(formPermission.value.userRole).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.alertNotificationsService.infoAlert(
            "This user already have role"
          );
        } else {
          this.userService.postRoleWiseResourcePermission(postObject).subscribe(
            x => {
              this.alertNotificationsService.successAlert(x);
              // this.getUserRole();
            },
            error => {
              this.alertNotificationsService.errorAlert(error);
            }
          );
        }
      },
      error => {
        this.alertNotificationsService.errorAlert(error);
      },
      () => console.log("Observer got a complete notification")
    );

  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
