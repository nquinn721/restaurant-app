import { Store, Service } from "mobx-store-model";
import { createContext } from "react";

import { Category } from "./models/Category.model";
import { Item } from "./models/Item.model";
import { Location } from "./models/Location.model";

Service.setBaseUrl("http://localhost:8080");
// Service.setBaseUrl("https://elevated-column-284822.ue.r.appspot.com/");

class MainStore {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);

  bag: any[] = [];

  constructor() {
    this.getData();
  }

  async getData() {
    await this.categories.initLoad();
    await this.items.initLoad();
    await this.locations.initLoad();
    console.log(this.categories.objects.length);
  }
}

export const Main = createContext(new MainStore());
