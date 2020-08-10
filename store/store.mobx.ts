import { Store, Service } from "mobx-store-model";
import { Category } from "./models/category.model";
import { Item } from "./models/item.model";
import { createContext } from "react";
import { Location } from "./models/location.model";

Service.setBaseUrl("http://localhost:8080");
// Service.setBaseUrl("https://elevated-column-284822.ue.r.appspot.com/");

class MainStore {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);

  // constructor() {
  //   this.getData();
  // }

  // async getData() {
  //   await this.categories.initLoad();
  //   // await this.items.initLoad();
  //   console.log("got data", this.categories.objects.length);
  // }
}

export const Main = createContext(new MainStore());
