import React, { useContext } from "react";
import { View, Text } from "../components/Themed";
import { Button, Input } from "react-native-elements";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import { Service } from "mobx-store-model/lib";
import { Main } from "../store/Store.mobx";

const getCreditCardToken = async (cc, total) => {
  if (!cc.valid) return;
  const data = cc.values;

  const card = {
    "card[number]": data.number.replace(/ /g, ""),
    "card[exp_month]": data.expiry.split("/")[0],
    "card[exp_year]": data.expiry.split("/")[1],
    "card[cvc]": data.cvc,
  };

  const d = await Service.post(
    "https://api.stripe.com/v1/tokens",
    Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&"),
    {
      Authorization: "Bearer pk_test_SxLXrzbxiAiTwnt8qiOW1agS",
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );

  const token = d.id;
  const body = await Service.post("http://localhost:8080/user/checkout", {
    token,
    total,
  });
};

export default function Checkout() {
  const store = useContext(Main);
  const total = store.cartTotal();
  console.log(store.cartTotal());

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
      <CreditCardInput
        autoFocus
        onChange={(a) => getCreditCardToken(a, total)}
      />
      <View>
        <Input placeholder="Name on card" />
      </View>
      <View style={{ padding: 20 }}>
        <Button title="Pay" onPress={store.createOrder.bind(store)} />
      </View>
    </View>
  );
}
