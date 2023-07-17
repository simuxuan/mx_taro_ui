import { ViewProps } from "@tarojs/components";
import { FunctionComponent } from "react";
import { NativeSafeAreaViewProps } from "react-native-safe-area-context";

export interface TaroSafeAreaViewProps {
  style?: Object;
}

// 组件的type
export type TaroSafeAreaViewType = FunctionComponent<
  NativeSafeAreaViewProps & ViewProps
>;

// 定义声明
declare const TaroSafeAreaView: TaroSafeAreaViewType

export default TaroSafeAreaView
