import {
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  Input,
  Injectable,
  ApplicationRef,
  ChangeDetectorRef
} from "@angular/core";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { map, catchError, filter } from "rxjs/operators";

import { UserService } from "../../../core/user.service";

// import "myJson" from "../../../core/model/data.json";

@Pipe({
  name: "filterproduct"
})
export class FilterProductPipe implements PipeTransform {
  transform(
    items: any,
    filter: any,
    filterItems: Array<any>,
    isAnd: boolean
  ): any {
    console.log("Filtering ..");
    if (filter && Array.isArray(items) && filterItems) {
      let filterKeys = Object.keys(filter);
      let checkedItems = filterItems.filter(item => {
        return item.checked;
      });
      if (!checkedItems || checkedItems.length === 0) {
        return items;
      }
      if (isAnd) {
        return items.filter(item =>
          filterKeys.reduce(
            (acc1, keyName) =>
              acc1 &&
              checkedItems.reduce(
                (acc2, checkedItem) =>
                  (acc2 &&
                    new RegExp(item[keyName], "gi").test(checkedItem.value)) ||
                  checkedItem.value === "",
                true
              ),
            true
          )
        );
      } else {
        return items.filter(item => {
          return filterKeys.some(keyName => {
            return checkedItems.some(checkedItem => {
              return (
                new RegExp(item[keyName], "gi").test(checkedItem.value) ||
                checkedItem.value === ""
              );
            });
          });
        });
      }
    } else {
      return items;
    }
  }
}

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styles: []
})
export class ProductComponent implements OnInit {
  public originalData: any[] = [];
  score: number = 0;
  brands: Array<any>;
  prices: Array<number>;
  types: any;

  public items: Array<any>;
  public filterItems: Array<any>;

  // displayRatingScore = 4;

  constructor(
    private userService: UserService,
    private changeRef: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) {
    this.items = [];
  }

  ngOnInit() {
    this.createItems();
  }
  private createItems() {
    this.userService.getJSON("./assets/model/data.json").subscribe(
      res => {
        this.items = res;
        const brandArray = res.map(item => item.brand);
        const typeArray = res.map(item => item.type);
        const priceArray = res.map(item => item.price);
        console.log(priceArray);
        const unicValueOfBrand = Array.from(new Set(brandArray));
        const brandNewArray = [];
        unicValueOfBrand.forEach( unicValueOfBrand => {
          brandNewArray.push({
            value: unicValueOfBrand,
            checked: false
          });
        });

        this.filterItems = brandNewArray;
        this.types = Array.from(new Set(typeArray));
        this.prices = Array.from(new Set(priceArray));
      },
      err => {
        console.error(err);
      }
    );
  }

  public checked() {
    if (this.filterItems) {
      return this.filterItems.filter(item => {
        return item.checked;
      });
    }
  }

  public onRateChange = score => {
    this.score = score;
  }
}
