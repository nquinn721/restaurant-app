import * as React from "react";
import { StyleSheet, Button } from "react-native";

import { View } from "../components/Themed";
import { Main } from "../store/store.mobx";
import { TextInput } from "react-native-gesture-handler";

export default function EditRestaurant({ navigation }: any) {
  const { categories } = React.useContext(Main);
  const [name, setName] = React.useState(categories.current.name);
  return (
    <View style={styles.container}>
      <TextInput onChangeText={(text) => setName(text)} value={name} />
      <Button
        onPress={async () => {
          categories.current.name = name;
          const d = await categories.saveCurrent();
          categories.objects = [d];

          navigation.navigate("TabOne");
        }}
        title="Save"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
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
