import { Model } from "mobx-store-model/lib";

export class OrderItem {
  id?: number = 0;
  item: number = 0;
  sides?: any = [];
  mods?: any = [];
}

export class Order extends Model {
  route: string = "order";
  items: OrderItem[] = [];

  convertForSave() {
    const data = {
      items: this.items.map((v: OrderItem) => ({
        item: v.item,
        mods: v.mods.map((a: any) => ({ modification: a.id })),
        sides: v.sides.map((a: any) => ({ side: a.id })),
      })),
    };

    const d = super.convertForSave(data);
    console.log(d);

    return d;
  }
}
