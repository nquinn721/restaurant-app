import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Main } from "../store/store.mobx";
import { ListItem } from "react-native-elements";

export default function ItemList({ navigation, route }: any) {
  const { items, categories } = React.useContext(Main);
  const category = categories.current;
  let [item, setItem]: any[] = React.useState([]);

  async function getData() {
    const i = await items.getData(
      items.route + `?s={"category": ${category.id}}`
    );
    setItem(i);
  }
  React.useEffect(() => {
    getData();
  }, [category.id]);

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
