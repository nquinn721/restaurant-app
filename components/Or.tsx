import React from "react";
import { View, Text } from "./Themed";

export default function () {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <View
        style={{
          backgroundColor: "#aaa",
          height: 1,
          width: "30%",
        }}
      ></View>
      <Text style={{ color: "#aaa", width: "30%", textAlign: "center" }}>
        OR
      </Text>
      <View
        style={{
          backgroundColor: "#aaa",
          height: 1,
          width: "30%",
        }}
      ></View>
    </View>
  );
}
