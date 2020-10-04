import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import { Text } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import { Tile } from "react-native-elements";
import ScrollRefresh from "../components/ScrollRefresh";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Home({ navigation }: any) {
  const store = React.useContext(Main);
  const { categories } = store;
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);

  // Notifications
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    async function getData() {
      await categories.refreshData();
      setData(categories.objects);
    }
    getData();
  }, []);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );
    schedulePushNotification();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Main.Provider value={store}>
      {categories.fetchFailed && <Text>Failed to get data</Text>}
      <ScrollRefresh onRefresh={() => setRefreshing(true)}>
        {data.map((v, i) => {
          return (
            <Tile
              key={i}
              imageSrc={{ uri: v.IMAGE }}
              overlayContainerStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
              title={v.name}
              featured
              onPress={() => {
                categories.setCurrent(v);
                navigation.navigate("ItemList");
              }}
            />
          );
        })}
      </ScrollRefresh>
    </Main.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restaurant: {
    padding: 10,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
});

async function schedulePushNotification() {
  console.log("schedulign notification");

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
