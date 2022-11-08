import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, useColorScheme } from "react-native";

import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { darkTheme } from "./styled";
import { lightTheme } from "./styled";

export default function App() {
  const isDark = useColorScheme() === "dark";

  // 폰트 load
  const [fontLoaded, fontError] = useFonts(Ionicons.font);

  // 에셋 load
  const [assets, assetsError] = useAssets([require("./public/workout.jpeg")]);

  // prepare 작업 state
  const [prepared, setPrepared] = useState(false);

  // useAssets 훅이나, useFonts를 사용하면 코드가 줄어들지만 prepare에서 할 수 있는 유연성이 떨어짐.
  // 나는 그래서 같이 쓸 것이다.
  const prepare = async () => {
    try {
      // 받아서 asset으로 사용하는 걸 추천한다.
      await Image.prefetch(
        "https://www.sheknows.com/wp-content/uploads/2021/08/body-weight-workouts.png?resize=1024,694"
      );
    } catch (e) {
      console.warn(e);
    } finally {
      setPrepared(true);
    }
  };

  const appIsReady = useMemo(() => {
    if (fontLoaded && assets && prepared) {
      return true;
    } else {
      return false;
    }
  }, [fontLoaded, assets, prepared]);

  // 시작
  useEffect(() => {
    prepare();
  }, []);

  // View가 마운트 되었을 때, 실행하는 것
  // onLayout
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  onLayoutRootView();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );

  // <View
  // 	style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  // 	onLayout={onLayoutRootView}
  // >
  // 	<Text>SplashScreen Demo! 👋</Text>
  // </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
