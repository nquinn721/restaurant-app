import React, { useContext, useEffect } from "react";
import { Text, Card, Button, Icon } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";
import { View } from "../components/Themed";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function () {
  const store = React.useContext(Main);
  const costs = store.bag.map((v) => v.cost);
  const items: any = {};
  let total = 0;

  if (costs.length) {
    total = costs.reduce((a, b) => a + b).toFixed(2);
  }

  store.bag.map((v) => {
    if (!items[v.name]) items[v.name] = { item: v, total: 1 };
    else items[v.name].total++;
  });
  useEffect(() => {
    console.log("changed");
  }, [store.bag]);

  return (
    <View style={{ padding: 10 }}>
      <Text h4>Your bag</Text>
      <Space />
      <View style={{ justifyContent: "space-between", height: "90%" }}>
        <View>
          {Object.values(items).map((v, i) => (
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
                  onPress={() => store.removeFromBag(v)}
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
          <Button title="Check out" />
        </View>
      </View>
    </View>
  );
}
