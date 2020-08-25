import { Model } from "mobx-store-model";

export class Modification extends Model {
  route: string = "modification";
  item: any = {};
  constructGetParams() {
    return super.constructGetParams({ join: "item||id" });
  }
}
