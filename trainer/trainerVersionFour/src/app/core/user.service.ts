/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";

/**
 * Application dependency
 */
import { CoreModule } from "./core.module";
import { User } from "../core/model/user.model";

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  selectedUser: User = {
    fullName: "",
    email: "",
    passwork: ""
  };
  constructor() {}
}
