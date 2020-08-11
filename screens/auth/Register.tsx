import React from "react";
import { View, Text } from "../../components/Themed";
import { Input, Button } from "react-native-elements";

export default function Register() {
  return (
    <View style={{ height: "100%", padding: 10 }}>
      <Input placeholder="first name*" />
      <Input placeholder="last name*" />
      <Input placeholder="email*" />
      <Input placeholder="phone" />
      <Button
        title="Register"
        buttonStyle={{ backgroundColor: "#A13647" }}
        raised
      />
    </View>
  );
}
