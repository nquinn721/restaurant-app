import { Store, Service } from "mobx-store-model";
import { createContext } from "react";
import { observable } from "mobx";

import { Category } from "./models/Category.model";
import { Item } from "./models/Item.model";
import { Location } from "./models/Location.model";
import { User } from "./models/User.model";
import AsyncStorage from "@react-native-community/async-storage";
import { Side } from "./models/Side.model";
import { Modification } from "./models/Modification.model";
// Service.setBaseUrl("http://localhost:8080");
Service.setBaseUrl("https://elevated-column-284822.ue.r.appspot.com/");

class MainStore {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);
  users = new Store(User);
  sides = new Store(Side);
  modifications = new Store(Modification);
  user: any = null;

  cart: any[] = [];

  isLoggingIn: boolean = false;
  sessionExpired: boolean = false;
  isLoggedIn: boolean = false;
  loginError: boolean = false;

  constructor() {
    this.getData();
  }

  async getData() {
    await this.categories.initLoad();
    await this.items.initLoad();
    await this.locations.initLoad();
    await this.sides.initLoad();
    await this.modifications.initLoad();
    console.log(this.categories.objects.length);
    const authToken = await AsyncStorage.getItem("Authorization");
    this.user = await AsyncStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (authToken) {
      Service.ajax.defaults.headers.common.Authorization = `Bearer ${authToken}`;
      Service.isLoggedIn = true;
    }
  }

  removeFromCart(item: any) {
    this.cart.splice(this.cart.indexOf(item), 1);
    console.log("items left", this.cart.length);
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
}

export const Main = createContext(new MainStore());
