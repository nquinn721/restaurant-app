import React, { useContext, useEffect } from "react";
import { Text, Card, Button, Icon, BottomSheet } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";
import { View } from "../components/Themed";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { observer } from "mobx-react";

export default observer(({ navigation }) => {
  const store = React.useContext(Main);
  const { cart } = store;

  return (
    <View style={{ padding: 10 }}>
      <Text h4>Your cart</Text>
      <Space />
      {!!cart.items.length ? (
        <View style={{ justifyContent: "space-between", height: "90%" }}>
          <ScrollView>
            {cart.items.map((v: any, i: number) => (
              <Card key={i}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flexGrow: 2 }}>
                    <Text>
                      {v.item.name} x {v.item.COST}
                    </Text>

                    <View style={{ marginTop: 20 }}>
                      {v.mods.map((a: any, j: number) => (
                        <View key={j}>
                          <Text>
                            {a.name} {!!a.COST && "x " + a.COST}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View style={{ marginTop: 20 }}>
                      {v.sides.map((a: any, j: number) => (
                        <View key={j}>
                          <Text>
                            {a.name} x {a.COST}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Text></Text>
                    <Text>{v.COST}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => store.cart.removeItem(v)}
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
          </ScrollView>
          <View style={{ padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 20 }}>Total</Text>
              <Text style={{ fontSize: 20 }}>${store.cart.total()}</Text>
            </View>
            <Button
              title="Proceed to checkout"
              onPress={() => navigation.navigate("Checkout")}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 100,
          }}
        >
          <Text style={{ color: "#999" }}>No items in cart</Text>
        </View>
      )}
    </View>
  );
});
