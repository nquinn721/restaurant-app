import React, { useContext, useCallback, useState } from "react";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import Login from "./Login";
import Register from "./Register";
import { Main } from "../../store/Store.mobx";
import { View } from "../../components/Themed";
import { Text, Button, Overlay } from "react-native-elements";
import Account from "./Account";
import { Space } from "../../components/Elements";

export default function () {
  const store = useContext(Main);
  const user = store.user;
  const [isLoggedIn, setIsLoggedIn] = useState(store.isLoggedIn);
  const [error, setError] = useState(false);

  const logout = useCallback(async () => {
    await store.logout();
    setIsLoggedIn(false);
  }, []);

  const login = useCallback(async (creds: any) => {
    setError(false);
    const d = await store.login(creds);

    if (d.error) setError(true);
    else setIsLoggedIn(true);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      {user && isLoggedIn ? (
        <Account logout={logout} />
      ) : (
        <ScrollableTabView>
          <Login tabLabel="Login" login={login} error={error} />
          <Register tabLabel="Register" />
        </ScrollableTabView>
      )}
    </View>
  );
}
