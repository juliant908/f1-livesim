import { Injectable } from '@angular/core';
import { tireCompounds } from "../../../../../../../simulation/tires"

@Injectable({
  providedIn: 'root'
})
export class TiresService {

  constructor() { }
  getTires() {
    return tireCompounds;
  }
}
