import { Model } from "mobx-store-model";
import { observable } from "mobx";

export class Modification extends Model {
  route: string = "modification";
  getParams: any = { join: "item||id" };
  item: any;
  cost = 0;
  type = "";
  @observable checked: boolean = false;

  get COST() {
    return this.cost && `$${this.cost.toFixed(2)}`;
  }
}
