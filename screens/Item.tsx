import React, { useContext, useState } from "react";
import { View } from "../components/Themed";
import { Text, Button, Overlay, CheckBox } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";
import { observer } from "mobx-react";
import { Modification } from "../store/models/Modification.model";

export default observer(({ navigation }: any) => {
  const { items, cart, sides, modifications } = useContext(Main);
  const { current } = items;
  const [overlay, setOverlay] = useState(false);

  const modifiers = modifications.objects.filter(
    (v: Modification) => v.item.id === current.id
  );
  return (
    <View
      style={{ height: "100%", padding: 10, justifyContent: "space-between" }}
    >
      {overlay && (
        <Overlay isVisible={overlay}>
          <Text>
            You've added{" "}
            <Text style={{ fontWeight: "800" }}>{current.name}</Text> to the
            cart
          </Text>
        </Overlay>
      )}
      <View>
        <Text h4 style={{ textAlign: "center" }}>
          {current.name}
        </Text>
        <Space />
        <Text style={{ color: "#444" }}>{current.description}</Text>
      </View>
      <View>
        <Text>Modifiers</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {modifiers.map((a) => (
            <View>
              <CheckBox
                key={a.id}
                title={a.name}
                onPress={() => (a.checked = !a.checked)}
                checked={a.checked}
              />
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text>Sides</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {sides.objects.map((a) => (
            <View>
              <CheckBox
                key={a.id}
                title={a.name}
                onPress={() => (a.checked = !a.checked)}
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

          cart.push(current);
          setTimeout(() => {
            items.resetCurrent();
            navigation.popToTop();
          }, 2000);
        }}
      />
    </View>
  );
});
