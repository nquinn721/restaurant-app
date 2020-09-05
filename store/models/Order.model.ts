import { Model } from "mobx-store-model/lib";
import { observable } from "mobx";

export class OrderItem {
  guid: string = Date.now() + "";
  item: any = {};
  sides?: any = [];
  mods?: any = [];
  objectKey = "guid";

  constructor(data: any) {
    Object.assign(this, data);
  }

  total() {
    let total = 0;
    total += parseFloat(this.item.cost);

    this.mods.forEach((a: any) => (total += parseFloat(a.cost || 0)));
    this.sides.map((a: any) => (total += parseFloat(a.cost || 0)));

    return total;
  }
}

export class Order extends Model {
  route: string = "order";

  @observable items: OrderItem[] = [];
  payment: any = {};

  convertForSave() {
    const data = {
      items: this.items.map((v: OrderItem) => ({
        item: v.item.id,
        mods: v.mods.map((a: any) => ({ modification: a.id })),
        sides: v.sides.map((a: any) => ({ side: a.id })),
      })),
    };

    const d = super.convertForSave(data);

    return d;
  }

  total() {
    let total = 0;
    this.items.forEach((v) => (total += v?.total()));

    return total.toFixed(2);
  }

  removeItem(item: any) {
    this.items = this.items.filter((v: any) => v.guid !== item.guid);
  }
}
