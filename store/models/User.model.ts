import { Model } from "mobx-store-model";

export class User extends Model {
  route: string = "user";
  user: any = false;

  setUser(user: any) {
    this.user = user;
  }
}
