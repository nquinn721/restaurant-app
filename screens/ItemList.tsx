import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../components/Themed";
import { ListItem } from "react-native-elements";
import { Main } from "../store/Store.mobx";
import { FlatList } from "react-native-gesture-handler";

export default function ItemList({ navigation, route }: any) {
  const { items, categories } = React.useContext(Main);
  const category = categories.current;
  const item = items.objects.filter((v) => v.category.id === category.id);

  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            title={
              <View
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Text>{item.name}</Text>
                <Text style={{ color: "#777" }}>{item.COST}</Text>
              </View>
            }
            bottomDivider
            chevron
            onPress={() => {
              items.setCurrent(item);
              navigation.navigate("Item");
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
