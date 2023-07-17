import { View, Text } from "react-native";
import React from "react";

let KeyboardAwareScrollView: any;
if (IS_RN) {
  KeyboardAwareScrollView =
    require("@codler/react-native-keyboard-aware-scroll-view").KeyboardAwareScrollView;
}

export default function TaroKeyboardAwareScrollView(props: any) {
  if (IS_RN) {
    return (
      <KeyboardAwareScrollView {...props}>
        {props.children}
      </KeyboardAwareScrollView>
    );
  }
  const { className = "" } = props;
  return <View className={`${className}`}>{props.children}</View>;
}

TaroKeyboardAwareScrollView.options = {
  addGlobalClass: true, // ?
};
