import React, { useContext, useState } from "react";
import { View, Text } from "../components/Themed";
import { Button, Input, Overlay } from "react-native-elements";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import { Service } from "mobx-store-model/lib";
import { Main } from "../store/Store.mobx";
import { Order } from "../store/models/Order.model";

const getCreditCardToken = async (cc) => {
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

  return token;
};

const pay = async (token, total) => {
  const body = await Service.post("http://localhost:8080/user/checkout", {
    token,
    total,
  });
};

export default function Checkout({ navigation }) {
  const store = useContext(Main);
  const total = store.cart.total();
  const [token, setToken] = useState(false);
  const [name, setName] = useState("");
  const [overlay, setOverlay] = useState(false);

  return (
    <View style={{ height: "100%", justifyContent: "space-between" }}>
      <Overlay isVisible={overlay} onBackdropPress={() => setOverlay(false)}>
        <View style={{ padding: 10, paddingHorizontal: 40 }}>
          <Text style={{ marginTop: 20, color: "#999" }}>Completed order</Text>
        </View>
      </Overlay>
      <CreditCardInput
        autoFocus
        onChange={async (a) => setToken(await getCreditCardToken(a))}
      />
      <View>
        <Input placeholder="Name on card" onChangeText={(a) => setName(a)} />
      </View>
      <View style={{ padding: 20 }}>
        <Button
          disabled={!token || name.length < 3}
          title="Pay"
          onPress={async () => {
            await pay(token, total);
            store.cart.payment = {
              token,
              name,
            };
            setOverlay(true);
            store.cart.save();

            setTimeout(() => {
              store.cart = new Order();
              navigation.popToTop();
            }, 2000);
          }}
        />
      </View>
    </View>
  );
}
