import React, { useState, useContext, useCallback, useEffect } from "react";
import Auth0 from "react-native-auth0";
import { Alert, TouchableOpacity } from "react-native";
import { View } from "../../components/Themed";
import {
  Input,
  Icon,
  Text,
  Button,
  Image,
  Overlay,
} from "react-native-elements";
import Or from "restaurant/components/Or";
import LoginWGoogle from "../../components/LoginWGoogle";
import LoginWFB from "../../components/LoginWFB";
import { Space } from "../../components/Elements";

export default function (props: any) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("walter@walter.com");
  const [password, setPassword] = useState("walter123");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (props.error) {
      setLoading(false);
      setError(true);
    }
  }, [props.error]);
  function login() {
    setLoading(true);
    props.login({ username: email, password });
  }

  function clearError() {
    setError(false);
    setLoading(false);
  }
  return (
    <View style={{ padding: 30, backgroundColor: "white", height: "100%" }}>
      <Overlay
        isVisible={error}
        onBackdropPress={clearError}
        overlayStyle={{ backgroundColor: "#d63031" }}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d63031",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#d63031",
              alignItems: "center",
            }}
          >
            <Icon name="error" type="fontawesome" style={{ marginRight: 10 }} />
            <Text style={{ color: "white" }}>Failed to login</Text>
          </View>
          <Space />
          <Text style={{ color: "white" }}>
            Check your credentials and try again
          </Text>
        </View>
      </Overlay>
      <Input
        leftIcon={<Icon name="user" type="font-awesome" color="#aaa" />}
        onChange={(a) => setEmail(a.nativeEvent.text.toLowerCase())}
        value={email}
        placeholder="Email"
      />
      <Input
        leftIcon={<Icon name="lock" type="font-awesome" color="#aaa" />}
        value={password}
        secureTextEntry={true}
        onChange={(a) => setPassword(a.nativeEvent.text.toLowerCase())}
        placeholder="Password"
      />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ marginBottom: 20, fontSize: 12, color: "#74b9ff" }}>
          Forgot your password?
        </Text>
        <Button
          title="Continue"
          onPress={() => login()}
          buttonStyle={{ backgroundColor: "#A13647" }}
          loading={loading}
          disabled={!password || !email}
          raised
        />
      </View>
      <Or />
      <View style={{ paddingHorizontal: 10 }}>
        <LoginWGoogle login={props.login} />
        <Space />
        <LoginWFB login={props.login} />
      </View>
    </View>
  );
}
