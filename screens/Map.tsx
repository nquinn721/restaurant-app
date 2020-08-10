import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SearchBar, Button, Icon } from "react-native-elements";
import { Main } from "../store/store.mobx";

export default function Map() {
  const { locations } = React.useContext(Main);
  const lat = 40.0339499;
  const long = -83.1125029;
  const [locs, setLoc] = React.useState([]);

  async function getData() {
    await locations.initLoad();
    setLoc(locations?.objects);
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>select a location</Text>
      <View style={styles.mapStyle}>
        <SearchBar
          placeholder="City, State or Zip Code"
          inputContainerStyle={{
            backgroundColor: "white",
            borderRadius: 40,
            height: 30,
            borderWidth: 1,
            borderColor: "#bbb",
          }}
          containerStyle={{
            backgroundColor: "rgba(255,255,255,0)",
            position: "absolute",
            width: "100%",
            height: 50,
            top: 10,
            zIndex: 4,
            borderTopColor: "rgba(0,0,0,0)",
            borderBottomColor: "rgba(0,0,0,0)",
          }}
          inputStyle={{
            fontSize: 12,
          }}
        />
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.322,
            longitudeDelta: 0.421,
          }}
        />
      </View>
      {locs.map((v, i) => (
        <View
          style={{ padding: 10, display: "flex", flexDirection: "row" }}
          key={i}
        >
          <View style={{ flexGrow: 2 }}>
            <Text style={{ fontWeight: "600" }}>{v.name}</Text>
            <Text>{v.address1}</Text>
            <Text>{v.address2}</Text>
            <Text>{v.phone}</Text>
          </View>
          <View>
            <Button
              containerStyle={styles.button}
              icon={
                <Icon
                  name="arrow-right"
                  type="font-awesome"
                  color="white"
                  style={{ marginRight: 10 }}
                  size={15}
                />
              }
              raised
              title="Delivery"
            />
            <Button
              containerStyle={styles.button}
              icon={
                <Icon
                  name="arrow-right"
                  type="font-awesome"
                  color="white"
                  style={{ marginRight: 10 }}
                  size={15}
                />
              }
              raised
              title="Pickup"
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapStyle: {
    height: "50%",
    width: "100%",
    borderTopColor: "#aaa",
    borderTopWidth: 1,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  button: {
    marginBottom: 10,
  },
});
