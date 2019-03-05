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


