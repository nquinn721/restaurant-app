import { Store, Service } from "mobx-store-model";
import { createContext } from "react";
import { observable } from "mobx";

import { Category } from "./models/Category.model";
import { Item } from "./models/Item.model";
import { Location } from "./models/Location.model";
import { User } from "./models/User.model";
import AsyncStorage from "@react-native-community/async-storage";
Service.setBaseUrl("http://localhost:8080");
// Service.setBaseUrl("https://elevated-column-284822.ue.r.appspot.com/");

class MainStore {
  categories = new Store(Category);
  items = new Store(Item);
  locations = new Store(Location);
  users = new Store(User);
  user: any = null;

  cart: any[] = [];

  isLoggingIn: boolean = false;
  sessionExpired: boolean = false;
  isLoggedIn: boolean = false;
  loginError: boolean = false;

  constructor() {
    this.getData();
  }

  async getData(cb?: any) {
    await this.categories.initLoad();
    await this.items.initLoad();
    await this.locations.initLoad();
    console.log(this.categories.objects.length);
    const authToken = await AsyncStorage.getItem("Authorization");
    this.user = await AsyncStorage.getItem("user");
    this.user = JSON.parse(this.user);
    if (authToken) {
      Service.ajax.defaults.headers.common.Authorization = `Bearer ${authToken}`;
      Service.isLoggedIn = true;
    }

    cb && cb();
  }
  removeFromCart(item: any) {
    this.cart.splice(this.cart.indexOf(item), 1);
    console.log("items left", this.cart.length);
  }

  async login(creds: object) {
    this.sessionExpired = false;
    this.isLoggingIn = true;
    const login = await Service.post("/auth/login", creds);
    console.log(login);

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
}

export const Main = createContext(new MainStore());
