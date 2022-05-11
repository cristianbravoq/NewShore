import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Rutes {
  departureStation: any;
  arrivalStation: any;
}

const initRutes: Rutes = {
  departureStation: '',
  arrivalStation: ''
}

@Injectable({
  providedIn: 'root'
})
export class InputRutesService {

  private rute$ = new BehaviorSubject<Rutes>(initRutes);


  constructor() {  }

  get selectedRute$(): Observable <Rutes> {
    return this.rute$.asObservable();
  }

  setRute(rute:Rutes): void {
    this.rute$.next(rute);
  }

}

