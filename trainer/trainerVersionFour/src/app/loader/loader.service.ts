import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = new Subject<boolean>();

    show() {
        this.isLoading.next(true);
        console.log(this.isLoading);
    }

    hide() {
        this.isLoading.next(false);
    }
}
