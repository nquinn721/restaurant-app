import React, { useContext, useState } from "react";
import { View } from "../components/Themed";
import { Text, Button, Overlay, CheckBox } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";
import { observer } from "mobx-react";
import { Modification } from "../store/models/Modification.model";

const OVERLAY = (overlay, setOverlay, order) => {
  return (
    <Overlay isVisible={overlay} onBackdropPress={() => setOverlay(false)}>
      <View style={{ padding: 10, paddingHorizontal: 40 }}>
        <Text style={{ fontWeight: "800", marginTop: 20, marginBottom: 20 }}>
          {order.item.name}
        </Text>
        {!!order.mods.length && <Text>Mods:</Text>}
        {order.mods.map((v) => (
          <Text style={{ fontWeight: "600", paddingLeft: 20 }}>{v.name}</Text>
        ))}
        {!!order.sides.length && <Text style={{ marginTop: 20 }}>Sides:</Text>}
        {order.sides.map((v) => (
          <Text style={{ fontWeight: "600", paddingLeft: 20 }}>
            {v.name} {v.COST}
          </Text>
        ))}
        <Text style={{ marginTop: 20, color: "#999" }}>Added to the cart</Text>
      </View>
    </Overlay>
  );
};

export default observer(({ navigation }: any) => {
  const store = useContext(Main);
  const { items, sides, modifications } = store;
  const [savingOrder, setSavingOrder] = useState(false);
  const { current } = items;
  const [overlay, setOverlay] = useState(false);
  const [order, setOrder] = useState({ item: current, mods: [], sides: [] });
  const modifiers = store.getOrderedModifiers(current);
  return (
    <View
      style={{ height: "100%", padding: 10, justifyContent: "space-between" }}
    >
      {OVERLAY(overlay, setOverlay, order)}
      <View>
        <Text h4 style={{ textAlign: "center" }}>
          {current.name}
        </Text>
        <Space />
        <Text style={{ color: "#444" }}>{current.description}</Text>
      </View>
      <View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Object.keys(modifiers).map((l) => (
            <View>
              <Text>{l}</Text>
              {modifiers[l].map((a) => (
                <View key={a.id} style={{ width: "90%" }}>
                  <CheckBox
                    key={a.id}
                    title={a.name + " " + (a.COST || "")}
                    containerStyle={{ width: "100%" }}
                    onPress={() => {
                      a.checked = !a.checked;
                      setOrder({
                        ...order,
                        mods: modifications.objects.filter((v) => v.checked),
                      });
                    }}
                    checked={a.checked}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text>Sides</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {sides.objects.map((a) => (
            <View key={a.id} style={{ width: "90%" }}>
              <CheckBox
                containerStyle={{ width: "100%" }}
                key={a.id}
                title={a.name + " " + a.COST}
                onPress={() => {
                  a.checked = !a.checked;
                  setOrder({
                    ...order,
                    sides: sides.objects.filter((v) => v.checked),
                  });
                }}
                checked={a.checked}
              />
            </View>
          ))}
        </View>
      </View>

      <Button
        title="Add to cart"
        onPress={() => {
          setOverlay(true);
          setSavingOrder(true);
          store.addToOrder(order);
          setTimeout(() => {
            items.resetCurrent();
            navigation.popToTop();
          }, 2000);
        }}
      />
    </View>
  );
});
