import { Model } from "mobx-store-model";

export class Item extends Model {
  route: string = "item";
  getParams: any = { join: ["category||id"] };
}
