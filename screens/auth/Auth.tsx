import React from "react";
import ScrollableTabView, {
  ScrollableTabBar,
} from "react-native-scrollable-tab-view";
import Login from "./Login";
import Register from "./Register";
export default function () {
  return (
    <ScrollableTabView>
      <Login tabLabel="Login" />
      <Register tabLabel="Register" />
    </ScrollableTabView>
  );
}
