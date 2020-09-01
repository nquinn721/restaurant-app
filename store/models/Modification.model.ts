import { Model } from "mobx-store-model";
import { observable } from "mobx";

export class Modification extends Model {
  route: string = "modification";
  item: any;
  @observable
  checked: boolean = false;
  constructGetParams() {
    return super.constructGetParams({ join: "item||id" });
  }
}
