import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import { ListItem, Tile } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
const images: any = {
  Burgers: require("../assets/images/burger.jpg"),
  Sandwitches: require("../assets/images/sandwitch.jpg"),
  Appetizers: require("../assets/images/appetizer.jpg"),
  Sides: require("../assets/images/side.jpg"),
};

export default function Home({ navigation }: any) {
  const { categories } = React.useContext(Main);

  React.useEffect(() => {}, [categories.fetchingData]);

  return (
    <View style={styles.container}>
      {categories.fetchFailed && <Text>Failed to get data</Text>}
      {categories.fetchingData ? (
        <Text>Fetching</Text>
      ) : (
        <ScrollView>
          {categories.objects.map((v, i) => {
            return (
              <Tile
                key={i}
                imageSrc={images[v.name]}
                overlayContainerStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                title={v.name}
                featured
                onPress={() => {
                  categories.setCurrent(v);
                  navigation.navigate("ItemList");
                }}
              />
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
        </ScrollView>
      )}
    </View>
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
