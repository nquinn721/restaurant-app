import React, { useContext, useEffect } from "react";
import { Text, Card, Button, Icon, BottomSheet } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";
import { View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { observer } from "mobx-react";
// import { PaymentsStripe as Stripe } from "expo-payments-stripe";
// import { requestOneTimePayment } from "react-native-paypal";

// async function paypalPayment() {
//   const {
//     nonce,
//     payerId,
//     email,
//     firstName,
//     lastName,
//     phone,
//   } = await requestOneTimePayment(token, {
//     amount: "5", // required
//     // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
//     currency: "GBP",
//     // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
//     localeCode: "en_GB",
//     shippingAddressRequired: false,
//     userAction: "commit", // display 'Pay Now' on the PayPal review page
//     // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
//     intent: "authorize",
//   });
// }

export default observer(() => {
  const store = React.useContext(Main);
  const costs = store.cart.map((v) => v.cost);
  const items: any = {};
  let total = 0;

  if (costs.length) {
    total = costs.reduce((a, b) => a + b).toFixed(2);
  }

  store.cart.map((v) => {
    if (!items[v.name]) items[v.name] = { item: v, total: 1 };
    else items[v.name].total++;
  });

  return (
    <View style={{ padding: 10 }}>
      <Text h4>Your cart</Text>
      <Space />
      {!!store.cart.length ? (
        <View style={{ justifyContent: "space-between", height: "90%" }}>
          <View>
            {Object.values(items).map((v: any, i: number) => (
              <Card>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flexGrow: 2 }}>
                    <Text>{v.item.name}</Text>
                    <Text>x {v.total}</Text>
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Text></Text>
                    <Text>${(v.item.cost * v.total).toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => store.removeFromCart(v)}
                    style={{
                      padding: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#eee",
                    }}
                  >
                    <Icon
                      type="font-awesome-5"
                      name="trash"
                      size={15}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
          <View style={{ padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>Total</Text>
              <Text style={{ fontSize: 20 }}>${total}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>No items in cart</Text>
        </View>
      )}
    </View>
  );
});
