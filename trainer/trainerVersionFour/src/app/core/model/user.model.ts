/**
 * 	Multiple exports
 * Essentially, for everything you want to make public you need to add an export keyword at the start of it.
 * There is an alternate syntax,
 * where instead of adding an export keyword to every construct,
 * we can instead define within curly brackets what constructs should be exported. It looks like this:
 *
 *  class Math {
      add() {}
      subtract() {}
    }

    const PI = 3.14

    export {
      Math, PI
    }

 */

export class User {
  fullname: string;
  email: string;
  password: string;
}

export class Login {
  email: string;
  password: string;
}

export class ListOfRoles {
  _id: string;
  name: string;
}

export class ListOfUserRoles {
  constructor(
    public name: string,
    public _id?: string
  ) {}
}

export class ListOfResource {
  name: string;
  _id?: string;
}

/*
export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
*/
export class Alert {
  type: AlertType;
  message: string;
  alertId?: string;
  keepAfterRouteChange?: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export class SearchName {
  name: string;
}

/**
 * Resources
 */

export class ListOfResources {
  constructor(
    public name: string,
    public _id?: string
  ) {}
}
