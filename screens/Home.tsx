import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import { ListItem } from "react-native-elements";

export default function Home({ navigation }: any) {
  const { categories } = React.useContext(Main);

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
