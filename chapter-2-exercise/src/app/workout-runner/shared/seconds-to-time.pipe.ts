import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (!isNaN(value)) {
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value - (hours * 3600)) / 60);
      const seconds = value - (hours * 3600) - (minutes * 60);
      const result = ('0' + hours).substr(-2) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
      return result;
    }
    return null;
  }

}
