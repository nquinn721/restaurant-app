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
import { Icon, Button, Badge } from "react-native-elements";
import Auth from "../screens/auth/Auth";
import Item from "../screens/Item";
import { View } from "../components/Themed";
import { Main } from "../store/Store.mobx";
import Bag from "../screens/Bag";

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
        component={EditRestaurantNavigator}
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
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator({ navigation }: any) {
  const { bag } = React.useContext(Main);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Categories",
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "pink",
          headerRight: () => (
            <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
              <Icon
                name="md-cart"
                type="ionicon"
                color="rgba(255, 255, 255, 0.4)"
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("Bag")}
              />
              {!!bag.length && (
                <Badge
                  status="error"
                  value={bag.length}
                  containerStyle={{
                    position: "absolute",
                    bottom: -4,
                    right: 5,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="ItemList"
        component={ItemList}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: "white",
          title: route?.params?.item?.name,
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
      <HomeStack.Screen
        name="Item"
        component={Item}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: "white",
          title: route?.params?.item?.name,
          headerStyle: {
            backgroundColor: "#2c3e50",
          },
          headerTitleStyle: {
            color: "white",
          },
        })}
      />
      <HomeStack.Screen
        name="Bag"
        component={Bag}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: "white",
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

const LocationStack = createStackNavigator<EditRestaurantList>();

function EditRestaurantNavigator() {
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

const AuthStack = createStackNavigator<EditRestaurantList>();

function AuthNavigator() {
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
        })}
      />
    </AuthStack.Navigator>
  );
}
