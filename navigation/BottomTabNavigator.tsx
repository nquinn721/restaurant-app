import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, LocationList, AuthList } from "../types";
import Map from "../screens/Map";
import { Icon } from "react-native-elements";
import Auth from "../screens/auth/Auth";
import { Main } from "../store/Store.mobx";
import HomeNavigator from "./stacks/HomeStack";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Locations"
        component={LocationsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-map" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AuthNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="user" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const LocationStack = createStackNavigator<LocationList>();

function LocationsNavigator() {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen
        name="Locations"
        component={Map}
        options={({ route }) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
    </LocationStack.Navigator>
  );
}

const AuthStack = createStackNavigator<AuthList>();

function AuthNavigator({ navigation }) {
  const store = React.useContext(Main);
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Account"
        component={Auth}
        options={({ route }) => ({
          title: route?.params?.name,
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={{ alignSelf: "flex-end" }}
          //     onPress={() => {
          //       store.logout();
          //       navigation.navigate("Home");
          //     }}
          //   >
          //     <Icon name="md-log-out" type="ionicon" color="#999" />
          //     <Text style={{ color: "#999" }}>logout</Text>
          //   </TouchableOpacity>
          // ),
        })}
      />
    </AuthStack.Navigator>
  );
}
