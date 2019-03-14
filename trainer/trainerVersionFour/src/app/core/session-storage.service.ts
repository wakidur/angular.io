/**
 * Frameworks dependency
 */
import { Injectable } from "@angular/core";

@Injectable()
export class SessionStorageService {
  constructor() {}

  /**
   * Get saved data from sessionStorage
   *  getItem
   */
  public getItem<T>(key: string): T {
    if (sessionStorage[key]) {
      return <T>JSON.parse(sessionStorage[key]);
    }
    return null;
  }

  /**
   * Save data to sessionStorage
   * setItem
   */
  public setToken(key: string, item: any) {
    sessionStorage[key] = JSON.stringify(item);
  }

  /**
   * Remove saved data from sessionStorage
   * removeItem
   */
  public removeItem(key: string) {
    if (sessionStorage[key]) {
      return sessionStorage.removeItem(key);
    }
    return null;
  }

  /**
   * Remove all saved data from sessionStorage
   * clear
   */
  public clear() {
    sessionStorage.clear();
  }
}
