import { Store } from "mobx-store-model";
import { Restaurant } from "./models/restaurant.model";
import { createContext } from "react";

class MainStore {
  restaurants = new Store(Restaurant);

  constructor() {
    this.getData();
  }

  async getData() {
    await this.restaurants.initLoad();
    console.log(this.restaurants.objects);
  }
}

export const Main = createContext(new MainStore());
