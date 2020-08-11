import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { ListItem } from "react-native-elements";
import { Main } from "../store/Store.mobx";

export default function ItemList({ navigation, route }: any) {
  const { items, categories } = React.useContext(Main);
  const category = categories.current;
  const item = items.objects.filter((v) => v.category.id === category.id);

  return (
    <View style={styles.container}>
      {item.map((v: any, i: number) => {
        return (
          <ListItem
            key={i}
            title={v.name}
            bottomDivider
            chevron
            onPress={() => navigation.navigate("ItemList", { category: v })}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
