import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-guessthenumber",
  templateUrl: "./guessthenumber.component.html",
  styleUrls: ["./guessthenumber.component.scss"]
})
export class GuessthenumberComponent implements OnInit {
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;

  constructor() { }

  /**
   * initializeGame
   */
  public initializeGame() {
    this.noOfTries = 0;
    this.original = Math.floor((Math.random() * 10 ) + 1);
    this.guess = null;
    this.deviation = null;
  }

  /**
   * verifyGuess
   */
  public verifyGuess() {
    this.deviation = this.original - this.guess;
    this.noOfTries = this.noOfTries + 1;
  }

  ngOnInit() {
    this.initializeGame();
  }
}
