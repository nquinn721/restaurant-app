import React from "react";
import { Image } from "react-native-elements";
import { View, Text } from "./Themed";
import * as Google from "expo-google-app-auth";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function (props: any) {
  async function getAuth() {
    const results = await Google.logInAsync({
      clientId:
        "490764248540-i5fv9ltt0v3lc8hbvlrsftlcrhivder9.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (results.type === "success") {
      props.login({
        ...results.user,
        accessToken: results.accessToken,
        username: results.user.email,
        password: "googleauth",
      });
    } else {
      alert("Failed to login with google");
    }
  }
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderColor: "#bbb",
        borderWidth: 1,
        padding: 10,
      }}
      onPress={getAuth}
    >
      <Image
        source={{
          uri:
            "data:image/png;base64,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",
        }}
        style={{ width: 20, height: 20, marginRight: 20 }}
      />
      <Text>Continue with Google</Text>
    </TouchableOpacity>
  );
}
