import * as React from "react";
import { StyleSheet } from "react-native";

import { Text } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import { Tile } from "react-native-elements";
import ScrollRefresh from "../components/ScrollRefresh";

export default function Home({ navigation }: any) {
  const store = React.useContext(Main);
  const { categories } = store;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      await categories.refreshData();
      setData(categories.objects);
    }
    getData();
  }, []);

  return (
    <Main.Provider value={store}>
      {categories.fetchFailed && <Text>Failed to get data</Text>}
      <ScrollRefresh onRefresh={() => setRefreshing(true)}>
        {data.map((v, i) => {
          return (
            <Tile
              key={i}
              imageSrc={{ uri: v.IMAGE }}
              overlayContainerStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              title={v.name}
              featured
              onPress={() => {
                categories.setCurrent(v);
                navigation.navigate("ItemList");
              }}
            />
          );
        })}
      </ScrollRefresh>
    </Main.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurant: {
    padding: 10,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
});
