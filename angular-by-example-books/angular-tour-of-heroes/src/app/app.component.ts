import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title = "angular-tour-of-heroes";

  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;

  constructor() {
    this.initializeGame();
  }

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
}
