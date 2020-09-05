import { Model } from "mobx-store-model";

export class ModType extends Model {
  route: string = "modification-type";
  name: string = "";
}
