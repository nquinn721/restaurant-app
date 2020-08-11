import React, { useContext, useState } from "react";
import { View } from "../components/Themed";
import { Text, Button, Overlay } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { Space } from "../components/Elements";

export default function ({ navigation }: any) {
  const { items, bag } = React.useContext(Main);
  const { current } = items;
  const [overlay, setOverlay] = React.useState(false);
  return (
    <View
      style={{ height: "100%", padding: 10, justifyContent: "space-between" }}
    >
      {overlay && (
        <Overlay isVisible={overlay}>
          <Text>
            You've added{" "}
            <Text style={{ fontWeight: "800" }}>{current.name}</Text> to the bag
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

      <Button
        title="Add to bag"
        onPress={() => {
          setOverlay(true);

          bag.push(current);
          setTimeout(() => {
            items.resetCurrent();
            navigation.popToTop();
          }, 2000);
        }}
      />
    </View>
  );
}
