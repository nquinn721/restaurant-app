import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              Home: "one",
            },
          },
          TabTwo: {
            screens: {
              ItemList: "two",
            },
          },
          EditRestaurant: {
            screens: {
              EditRestaurant: "Edit",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
