import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import json from "./animation.json";

const style = {
    height: 300,
    marginTop: 100,
    zIndex: 1,
  };
export default function LoadingScreen() {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <LottieView source={json} autoPlay loop style={style}/>
    </View>

  );
}