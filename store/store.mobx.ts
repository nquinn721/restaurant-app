import { Store, Service } from "mobx-store-model";
import { Category } from "./models/category.model";
import { createContext } from "react";

Service.setBaseUrl("http://localhost:8080");
class MainStore {
  categories = new Store(Category);

  constructor() {
    this.getData();
  }

  async getData() {
    console.log(Service.baseUrl);

    await this.categories.initLoad();
    console.log(this.categories.objects);
  }
}

export const Main = createContext(new MainStore());
