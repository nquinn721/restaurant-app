import React, { useState, useCallback, useContext } from "react";
import { View, Text } from "../../components/Themed";
import { Input, Button } from "react-native-elements";
import { Main } from "../../store/Store.mobx";

export default function Register() {
  const { users } = useContext(Main);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const register = useCallback(async () => {
    const a = await users.create({
      firstname,
      password,
      lastname,
      email,
      phone,
    });
    setFirstname("");
    setLastname("");
    setPassword("");
    setEmail("");
    setPhone("");
  }, []);
  return (
    <View style={{ height: "100%", padding: 10 }}>
      <Input
        placeholder="first name*"
        value={firstname}
        onChange={(a) => setFirstname(a.nativeEvent.text)}
      />
      <Input
        placeholder="last name*"
        value={lastname}
        onChange={(a) => setLastname(a.nativeEvent.text)}
      />
      <Input
        placeholder="email*"
        value={email}
        onChange={(a) => setEmail(a.nativeEvent.text.toLowerCase())}
      />
      <Input
        placeholder="password*"
        value={password}
        onChange={(a) => setPassword(a.nativeEvent.text.toLowerCase())}
      />
      <Input
        placeholder="phone"
        value={phone}
        onChange={(a) => setPhone(a.nativeEvent.text)}
      />
      <Button
        title="Register"
        buttonStyle={{ backgroundColor: "#A13647" }}
        onPress={register}
        disabled={!firstname || !lastname || !email || !password}
        raised
      />
    </View>
  );
}
