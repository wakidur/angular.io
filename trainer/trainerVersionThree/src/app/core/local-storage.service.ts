import { Injectable } from "@angular/core";

import { CoreModule } from "./core.module";

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {
  constructor() {}

  /**
   *  getItem
  */
  public getItem<T>(key: string): T {
    if (localStorage[key]) {
      return <T>JSON.parse(localStorage[key]);
    }
    return null;
  }

  /**
   * setItem
   */
  public setItem(key: string, item: any) {
    localStorage[key] = JSON.stringify(item);
  }
}
