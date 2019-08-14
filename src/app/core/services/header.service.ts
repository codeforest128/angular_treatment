import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  private saveActionSubject: BehaviorSubject<() => void> = new BehaviorSubject<() => void>(null);
  private allergiesSubject: BehaviorSubject<[]> = new BehaviorSubject<[]>(null);

  get saveAction$() {
    return this.saveActionSubject.asObservable();
  }

  get allergies$() {
    return this.allergiesSubject.asObservable();
  }

  setSaveAction(action) {
    this.saveActionSubject.next(action);
  }

  setAllergies(allergies) {
    this.allergiesSubject.next(allergies);
  }
}
