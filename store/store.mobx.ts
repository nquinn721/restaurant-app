import { Store, Service } from "mobx-store-model";
import { createContext } from "react";
import { observable, computed } from "mobx";

import { Category } from "./models/Category.model";
import { Item } from "./models/Item.model";
import { Location } from "./models/Location.model";
import { User } from "./models/User.model";
import AsyncStorage from "@react-native-community/async-storage";
import { Side } from "./models/Side.model";
import { Modification } from "./models/Modification.model";
import { Order, OrderItem } from "./models/Order.model";
// Service.setBaseUrl("http://localhost:8080");
Service.setBaseUrl("https://restaurant-server-288018.ue.r.appspot.com/");

class MainStore {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);
  users = new Store(User);
  sides = new Store(Side);
  modifications = new Store(Modification);
  user: any = null;

  @observable
  cart: Order = new Order();

  isLoggingIn: boolean = false;
  sessionExpired: boolean = false;
  isLoggedIn: boolean = false;
  loginError: boolean = false;

  constructor() {
    this.getData();
  }

  async getData() {
    await this.categories.refreshData();
    await this.items.refreshData();
    await this.locations.refreshData();
    await this.sides.refreshData();
    await this.modifications.refreshData();
    const authToken = await AsyncStorage.getItem("Authorization");
    this.user = await AsyncStorage.getItem("user");
    this.user = JSON.parse(this.user);

    if (authToken) {
      Service.setBearerToken(authToken);
      Service.isLoggedIn = true;
    }
  }

  async login(creds: object) {
    this.sessionExpired = false;
    this.isLoggingIn = true;

    const login = await Service.post("/auth/login", creds);

    Service.setBearerToken(login.access_token);

    this.isLoggedIn = true;
    this.isLoggingIn = false;
    if (login.error || login.logout) {
      this.loginError = login.error || "";
      this.isLoggedIn = false;
    } else {
      try {
        await AsyncStorage.setItem("Authorization", login.access_token);
        await AsyncStorage.setItem("user", JSON.stringify(login.user));
      } catch (e) {
        console.log(e);
      }
      this.isLoggedIn = true;
      this.user = login.user;
    }

    return login;
  }

  async logout() {
    await AsyncStorage.removeItem("Authorization");
    await AsyncStorage.removeItem("user");
    this.isLoggedIn = false;
    this.isLoggingIn = false;
  }

  async getCoords(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAvHC8FkiK6As9_tmLBrWz3NbTtJoQO6Uk`;
    return await Service.get(url);
  }
  addToOrder(item: OrderItem) {
    this.cart.items.add(item);

    this.sides.objects.forEach((v) => (v.checked = false));
    this.modifications.objects.forEach((v) => (v.checked = false));
  }

  getOrderedModifiers(item: Item) {
    const mods: any = {};
    const modifiers = this.modifications.objects.filter(
      (v: Modification) => v.item.id === item.id
    );

    modifiers.forEach((v: Modification) => {
      if (!mods[v.type]) mods[v.type] = [];
      mods[v.type].push(v);
    });

    return mods;
  }
}

export const Main = createContext(new MainStore());
