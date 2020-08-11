import React from "react";
import Auth0 from "react-native-auth0";
import { Alert } from "react-native";
import { View } from "../../components/Themed";
import { Input, Icon, Text, Button, Image } from "react-native-elements";
import Or from "restaurant/components/Or";
import LoginWGoogle from "../../components/LoginWGoogle";
import LoginWFB from "../../components/LoginWFB";
import { Space } from "../../components/Elements";
const googleSignInImage = require("../../assets/images/signingoogle.png");
const fbSignInImage = require("../../assets/images/signinfacebook.png");
const auth0 = new Auth0({
  clientId: "dNmuVLtfhk5O9wcqwM137C4KPLfJ09Wb",
  domain: "dev-le393411.us.auth0.com",
});

function login() {
  auth0.webAuth
    .authorize({
      scope: "openid profile email",
    })
    .then((credentials) => {
      Alert.alert("AccessToken: " + credentials.accessToken);
    })
    .catch((error) => console.log(error));
}
export default function () {
  return (
    <View style={{ padding: 30, backgroundColor: "white", height: "100%" }}>
      <Input
        leftIcon={<Icon name="user" type="font-awesome" color="#aaa" />}
        placeholder="Username"
      />
      <Input
        leftIcon={<Icon name="lock" type="font-awesome" color="#aaa" />}
        placeholder="Password"
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginBottom: 20, fontSize: 12, color: "#74b9ff" }}>
          Forgot your password?
        </Text>
        <Button
          title="Continue"
          buttonStyle={{ backgroundColor: "#A13647" }}
          raised
        />
      </View>
      <Or />
      <View style={{ paddingHorizontal: 10 }}>
        <LoginWGoogle />
        <Space />
        <LoginWFB />
      </View>
    </View>
  );
}
