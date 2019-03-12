import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchValue: any): any {
    console.log(value, searchValue);
    if (!searchValue) {
      return value;
    } else {
      return value.filter(response => {
        return response.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
      });
    }
  }
}
