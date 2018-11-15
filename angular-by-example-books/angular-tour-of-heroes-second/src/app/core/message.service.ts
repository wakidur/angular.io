import { Injectable } from "@angular/core";
import { CoreModule } from "./core.module";
@Injectable({
  providedIn: CoreModule
})
export class MessageService {
  messages: string[] = [];
  constructor() {}

  /**
   * add
   */
  public add(message: string) {
    this.messages.push(message);
  }

  /**
   * clear
   */
  public clear() {
    this.messages = [];
  }
}
