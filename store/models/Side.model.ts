import { Model } from "mobx-store-model/lib";
import { observable } from "mobx";

export class Side extends Model {
  route: string = "side";
  @observable
  checked: boolean = false;
  cost = 0;

  get COST() {
    return `$${this.cost.toFixed(2)}`;
  }
}
