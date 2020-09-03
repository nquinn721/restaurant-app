import React from "react";
import { Main } from "../../store/Store.mobx";
import { View } from "../../components/Themed";
import { Icon, Badge } from "react-native-elements";

import Home from "../../screens/Home";
import ItemList from "../../screens/ItemList";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeParamList } from "../../types";
import Item from "../../screens/Item";
import Cart from "../../screens/Cart";
import Checkout from "../../screens/Checkout";

const HomeStack = createStackNavigator<HomeParamList>();

export default function HomeNavigator({ navigation }: any) {
  const { cart } = React.useContext(Main);
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
            <View style={{ backgroundColor: "rgba(0,0,0,0)", marginRight: 20 }}>
              <Icon
                name="md-cart"
                type="ionicon"
                color="rgba(255, 255, 255, 0.4)"
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("Cart")}
              />
              {!!cart.items.length && (
                <Badge
                  status="error"
                  value={cart.items.length}
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
        name="Cart"
        component={Cart}
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
      <HomeStack.Screen
        name="Checkout"
        component={Checkout}
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
