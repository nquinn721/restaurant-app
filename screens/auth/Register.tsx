import React, { useState, useCallback, useContext } from "react";
import { View, Text } from "../../components/Themed";
import { Input, Button } from "react-native-elements";
import { Main } from "../../store/Store.mobx";

export default function Register() {
  const { user } = useContext(Main);
  const [u, setUser] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phone: "",
  });
  const register = useCallback(async () => {
    console.log(u);

    const a = await user.create(u);
    setUser({});
  }, []);
  return (
    <View style={{ height: "100%", padding: 10 }}>
      <Input
        placeholder="first name*"
        value={u.firstname}
        onChangeText={(a) => setUser({ ...u, firstname: a })}
      />
      <Input
        placeholder="last name*"
        value={u.lastname}
        onChangeText={(a) => setUser({ ...u, lastname: a })}
      />
      <Input
        placeholder="email*"
        value={u.email}
        onChangeText={(a) => setUser({ ...u, email: a })}
      />
      <Input
        placeholder="password*"
        value={u.password}
        onChangeText={(a) => setUser({ ...u, password: a })}
      />
      <Input
        placeholder="phone"
        value={u.phone}
        onChangeText={(a) => setUser({ ...u, phone: a })}
      />
      <Button
        title="Register"
        buttonStyle={{ backgroundColor: "#A13647" }}
        onPress={register}
        raised
      />
    </View>
  );
}
