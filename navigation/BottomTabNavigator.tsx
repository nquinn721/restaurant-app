import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Home from "../screens/Home";
import ItemList from "../screens/ItemList";
import {
  BottomTabParamList,
  HomeParamList,
  EditRestaurantList,
} from "../types";
import Map from "../screens/Map";

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
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Locations"
        component={EditRestaurantNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-map" color={color} />
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
const HomeStack = createStackNavigator<HomeParamList>();

function TabOneNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "McDonalds",
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "pink",
        }}
      />
      <HomeStack.Screen
        name="ItemList"
        component={ItemList}
        options={({ route }) => ({
          title: route?.params?.item?.name,
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
    </HomeStack.Navigator>
  );
}

const EditRestaurantStack = createStackNavigator<EditRestaurantList>();

function EditRestaurantNavigator() {
  return (
    <EditRestaurantStack.Navigator>
      <EditRestaurantStack.Screen
        name="EditRestaurantScreen"
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
    </EditRestaurantStack.Navigator>
  );
}
