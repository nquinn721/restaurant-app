import { Model } from "mobx-store-model";

export class Category extends Model {
  route: string = "category";
  image: string = "";

  get IMAGE() {
    return "https://storage.googleapis.com/restaurant-server/" + this.image;
    // return "https://storage.cloud.google.com/restaurant-server/" + this.image;
  }
}
