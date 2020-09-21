import { Model } from "mobx-store-model";

export class Category extends Model {
  route: string = "category";
  image: string = "";

  get IMAGE() {
    return "https://restaurant-server-288018.ue.r.appspot.com/" + this.image;
    // return "https://storage.cloud.google.com/restaurant-server/" + this.image;
  }
}
