import React, { useContext } from "react";
import { View } from "../../components/Themed";
import { Avatar, Text, Icon } from "react-native-elements";
import { Main } from "../../store/Store.mobx";
import { Space } from "../../components/Elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function (props: any) {
  const { user } = useContext(Main);
  return (
    <View style={{ height: "100%", padding: 20 }}>
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={props.logout}
      >
        <Icon name="md-log-out" type="ionicon" color="#999" />
        <Text style={{ color: "#999" }}>logout</Text>
      </TouchableOpacity>
      <View
        style={{ height: 200, alignItems: "center", justifyContent: "center" }}
      >
        <Avatar
          rounded
          source={{
            uri:
              user.photoUrl ||
              "data:image/png;base64,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",
          }}
          size={100}
        />
        <Space />
        <Text h4>
          {user.firstname} {user.lastname}
        </Text>
      </View>
      <Text>Recent orders</Text>
    </View>
  );
}
