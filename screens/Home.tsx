import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useObserver, inject } from "mobx-react";
import { Main } from "../store/store.mobx";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

export default function Home({ navigation }: any) {
  const { categories } = React.useContext(Main);
  const [cat, setCat] = React.useState([]);
  async function getData() {
    await categories.initLoad();
    setCat(categories?.objects);
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {categories.fetchingData ? (
        <Text>Fetching</Text>
      ) : (
        categories.objects.map((v, i) => {
          return (
            <ListItem
              key={i}
              title={v.name}
              bottomDivider
              chevron
              onPress={() => {
                categories.setCurrent(v);
                navigation.navigate("ItemList");
              }}
            />
          );
          // return (
          //   <TouchableOpacity
          //     onPress={() => {
          //       categories.setCurrent(v);
          //       navigation.navigate("EditRestaurant");
          //     }}
          //     style={styles.restaurant}
          //     key={i}
          //   >
          //     <Text>{v.name}</Text>
          //   </TouchableOpacity>
          // );
        })
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
