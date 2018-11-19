import { Component, OnInit } from "@angular/core";

import { MessageService } from "../core/message.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  allMessage: Array<string> = [];
  constructor(public  messageService: MessageService) {}
  /**
   * clearMessage
   */
  public clearMessage() {
    this.allMessage = [];
  }

  ngOnInit() {
    this.allMessage = this.messageService.messages;
  }
}
