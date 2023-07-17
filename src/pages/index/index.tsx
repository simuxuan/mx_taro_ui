import { Component, PropsWithChildren } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import { TaroSafeAreaView } from "@components/index";

export default class Index extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello smx</Text>
        <TaroSafeAreaView>
          <Text>123</Text>
        </TaroSafeAreaView>
      </View>
    );
  }
}
