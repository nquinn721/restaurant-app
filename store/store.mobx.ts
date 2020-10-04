import { Store, Service } from "mobx-store-model";
import { createContext } from "react";
import { observable, computed, toJS } from "mobx";

import { Category } from "./models/Category.model";
import { Item } from "./models/Item.model";
import { Location } from "./models/Location.model";
import { User } from "./models/User.model";
import AsyncStorage from "@react-native-community/async-storage";
import { Side } from "./models/Side.model";
import { Mod } from "./models/Mod";
import { Order, OrderItem } from "./models/Order.model";
import { ModType } from "./models/ModType.model";
// Service.setBaseUrl("http://localhost:8080");
Service.setBaseUrl("https://restaurant-server-288018.ue.r.appspot.com/");

class MainMobx {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);
  users = new Store(User);
  sides = new Store(Side);
  mods = new Store(Mod);
  modTypes = new Store(ModType);
  user: any = null;
  currentLocation: any = {};

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
    await this.mods.refreshData();
    await this.modTypes.refreshData();
    const authToken = await AsyncStorage.getItem("Authorization");
    this.user = await AsyncStorage.getItem("user");
    this.user = JSON.parse(this.user);

    if (this.locations.objects.length === 1)
      this.currentLocation = this.locations.objects[0];

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
  addToOrder(item: any) {
    const oi = new OrderItem(item);
    this.cart.items.push(oi);

    this.sides.objects.forEach((v) => (v.checked = false));
    this.mods.objects.forEach((v) => (v.checked = false));
  }

  getOrderedModifiers(item: Item) {
    const mods: any = {};
    const modifiers = this.mods.objects.filter(
      (v: Mod) => v.item.id === item.id
    );

    modifiers.forEach((v: Mod) => {
      if (!mods[v.type.name]) mods[v.type.name] = [];
      mods[v.type.name].push(v);
    });

    return mods;
  }
}

export const MainStore = new MainMobx();
export const Main = createContext(MainStore);
