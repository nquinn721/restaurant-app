import React, { useState, useCallback, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import { Main } from "../store/Store.mobx";

export default function (props: any) {
  const main = useContext(Main);
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    props.onRefresh && props.onRefresh();
    await main.getData();
    setRefreshing(false);
    props.onRefresh && props.onRefresh();
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {props.children}
    </ScrollView>
  );
}
