import { Model } from "mobx-store-model";
import { observable } from "mobx";
import { MainStore } from "../Store.mobx";
import { ModType } from "./ModType.model";

export class Mod extends Model {
  route: string = "modification";
  getParams: any = { join: ["item||id", "type"] };
  item: any;
  cost = 0;
  type: any = {};
  @observable checked: boolean = false;

  get COST() {
    console.log(this.cost);

    return this.cost && `$${this.cost.toFixed(2)}`;
  }
}
