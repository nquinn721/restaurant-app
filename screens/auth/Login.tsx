import React, { useState, useContext, useCallback } from "react";
import Auth0 from "react-native-auth0";
import { Alert } from "react-native";
import { View } from "../../components/Themed";
import { Input, Icon, Text, Button, Image } from "react-native-elements";
import Or from "restaurant/components/Or";
import LoginWGoogle from "../../components/LoginWGoogle";
import LoginWFB from "../../components/LoginWFB";
import { Space } from "../../components/Elements";
import { Main } from "../../store/Store.mobx";

const googleSignInImage = require("../../assets/images/signingoogle.png");
const fbSignInImage = require("../../assets/images/signinfacebook.png");

export default function (props: any) {
  const store = useContext(Main);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "walter@walter.com",
    password: "walter123",
  });

  const login = useCallback(async () => {
    props.login(user);
  }, []);
  return (
    <View style={{ padding: 30, backgroundColor: "white", height: "100%" }}>
      <Input
        leftIcon={<Icon name="user" type="font-awesome" color="#aaa" />}
        value={user.username}
        placeholder="Email"
      />
      <Input
        leftIcon={<Icon name="lock" type="font-awesome" color="#aaa" />}
        value={user.password}
        placeholder="Password"
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginBottom: 20, fontSize: 12, color: "#74b9ff" }}>
          Forgot your password?
        </Text>
        <Button
          title="Continue"
          onPress={login}
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
