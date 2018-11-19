import { Injectable } from "@angular/core";
import { CoreModule } from "./core.module";
@Injectable({
  providedIn: CoreModule
})
export class MessageService {
  messages: string[] = [];
  constructor() {}

  /**
   * Add message
   * add()
   * @param - message
   */
  public add(message: string) {
    this.messages.push(message);
  }

  /**
   * clear message
   * clear
   */
  public clear() {
    this.messages = [];
  }
}
