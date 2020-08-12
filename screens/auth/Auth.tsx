import React, { useContext, useCallback, useState } from "react";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import Login from "./Login";
import Register from "./Register";
import { Main } from "../../store/Store.mobx";
import { View } from "../../components/Themed";
import { Text, Button } from "react-native-elements";

export default function () {
  const store = useContext(Main);
  const user = store.user;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  const logout = useCallback(async () => {
    console.log("loggoin out");

    await store.logout();
    setIsLoggedIn(false);
  }, []);

  const login = useCallback(async (creds: any) => {
    await store.login(creds);
    setIsLoggedIn(true);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      {user && isLoggedIn ? (
        <View style={{ padding: 20 }}>
          <Text h4>Welcome back {user.firstname}</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <ScrollableTabView>
          <Login tabLabel="Login" login={login} />
          <Register tabLabel="Register" />
        </ScrollableTabView>
      )}
    </View>
  );
}
