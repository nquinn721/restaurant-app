import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import { ListItem, Tile, Image } from "react-native-elements";
import ScrollRefresh from "../components/ScrollRefresh";
const images: any = {
  Burgers: require("../assets/images/burger.jpg"),
  Sandwitches: require("../assets/images/sandwitch.jpg"),
  Appetizers: require("../assets/images/appetizer.jpg"),
  Sides: require("../assets/images/side.jpg"),
};

export default function Home({ navigation }: any) {
  const store = React.useContext(Main);
  const { categories } = store;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      await categories.refreshData();
      setData(categories.objects);
      console.log(categories.objects[0].IMAGE);
    }
    getData();
  }, []);

  return (
    <Main.Provider value={store}>
      {categories.fetchFailed && <Text>Failed to get data</Text>}
      <ScrollRefresh onRefresh={() => setRefreshing(true)}>
        <Image
          style={{ width: 40, height: 30 }}
          source={{
            uri:
              "https://storage.cloud.google.com/restaurant-server/appetizer.jpg",
          }}
        />
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
          }}
        />
        {data.map((v, i) => {
          console.log(v.IMAGE);

          return (
            <View
              key={i}
              style={{ width: 300, height: 300, backgroundColor: "#999" }}
            ></View>
            // <Tile
            //   key={i}
            //   imageSrc={{ uri: v.IMAGE }}
            //   overlayContainerStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            //   title={v.name}
            //   featured
            //   onPress={() => {
            //     categories.setCurrent(v);
            //     navigation.navigate("ItemList");
            //   }}
            // />
            // <ListItem
            //   key={i}
            //   title={v.name}
            //   bottomDivider
            //   chevron
            //   onPress={() => {
            //     categories.setCurrent(v);
            //     navigation.navigate("ItemList");
            //   }}
            // />
          );
        })}
      </ScrollRefresh>
    </Main.Provider>
  );
}
// export default inject("store")(observer(ImageList));
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
