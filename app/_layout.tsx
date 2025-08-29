import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import "../global.css";
const RootLayout = () => {
  const [loaded] = useFonts({
    Gambarino: require("../assets/fonts/Gambarino-Regular.otf"),
    Switzer: require("../assets/fonts/Switzer-Light.otf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" />;
  }

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default RootLayout;

