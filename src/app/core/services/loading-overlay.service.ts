import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingOverlayService {
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  setVisible(val: boolean) {
    this.isLoadingSubject.next(val);
  }
}
