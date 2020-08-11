import React from "react";
import { View } from "./Themed";

export const Space = (props: any) => (
  <View
    {...props}
    style={[{ height: 20 }, props.height && { height: props.height }]}
  />
);
