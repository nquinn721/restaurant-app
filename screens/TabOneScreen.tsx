import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useObserver, inject } from "mobx-react";
import { Main } from "../store/store.mobx";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabOneScreen({ navigation }: any) {
  const { restaurants } = React.useContext(Main);

  return (
    <View style={styles.container}>
      {restaurants.objects.map((v, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              restaurants.setCurrent(v);
              navigation.navigate("EditRestaurant");
            }}
            style={styles.restaurant}
            key={i}
          >
            <Text>{v.name}</Text>
          </TouchableOpacity>
        );
      })}
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
