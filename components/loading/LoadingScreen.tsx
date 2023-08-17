import LottieView from "lottie-react-native";
import React from "react";
import json from "./animation.json";

const style = {
    height: 300,
    marginTop: 100,
  };
export default function LoadingScreen() {
  return (

        <LottieView source={json} autoPlay loop style={style}/>

  );
}