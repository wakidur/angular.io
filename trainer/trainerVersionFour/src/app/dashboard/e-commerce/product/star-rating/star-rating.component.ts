import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styles: []
})
export class StarRatingComponent implements OnInit {
  @Input() score;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = -1;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
  }

  public mark = index => {
    this.marked = this.marked == index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);
  }

  public isMarked = index => {
    if (!this.forDisplay) {
      if (index <= this.marked) {
        return "fa-star";
      } else {
        return "fa-star-o";
      }
    } else {
      if (this.score >= index + 1) {
        return "fa-star";
      } else if (this.score > index && this.score < index + 1) {
        return " fa-star-half-o";
      } else {
        return "fa-star-o";
      }
    }
  }
}
