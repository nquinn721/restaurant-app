import { Model, Store } from "mobx-store-model/lib";
import { observable } from "mobx";

export class OrderItem extends Model {
  guid: string = Date.now() + "";
  item: any = {};
  sides?: any = [];
  mods?: any = [];
  objectKey = "guid";
  constructor(data: any) {
    super();
    Object.assign(this, data);
    console.log(this);
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

  items = new Store(OrderItem, "orderitems");

  convertForSave() {
    const data = {
      items: this.items.map((v: OrderItem) => ({
        item: v.item.id,
        mods: v.mods.map((a: any) => ({ modification: a.id })),
        sides: v.sides.map((a: any) => ({ side: a.id })),
      })),
    };

    const d = super.convertForSave(data);
    console.log(d);

    return d;
  }

  total() {
    return this.items.objects.reduce((a: any, b: any) => a.total() + b.total());
  }

  removeItem(item: OrderItem) {
    this.items.remove(item);
  }
}
