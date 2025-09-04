import { Stack } from "expo-router";
import "./globals.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Suspense, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../i18next";
import { useTranslation } from "react-i18next";
import { UserProvider } from "@/context/UserContext";
import Loader from "@/components/misc/Loader";
import Toast from "react-native-toast-message";
import {  showToast } from "@/utility/utilityFunctions";
import * as Updates from "expo-updates";


export default function RootLayout() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { i18n, t } = useTranslation();
  
  useEffect(() => {
    checkForUpdates()
    .then(() => initLang())
    .then(() => setLoaded(true))
    .catch((e) => console.error(e));
  }, []);
  
  const initLang = async () => {
    const l = await AsyncStorage.getItem("lang");
    if (l) {
      await i18n.changeLanguage(l);
    }
  };
  
  const checkForUpdates = async () => {
    try {
      if (__DEV__) return;
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
  
        showToast("info", t("update-available-header"), t("update-available-message"), 4000);
        setTimeout(() => {
          Updates.reloadAsync();
        }, 5000);
      }
    } catch (e) {
      console.log("Error checking for updates", e);
    }
  };

  if (!loaded) return <Loader />;
  
  return (
    <UserProvider>
    <Suspense fallback={<Loader />}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <Stack
            screenOptions={{
              statusBarStyle: "dark",
            }}
            >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LandingScreen"
              options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen
              name="OnboardingScreen"
              options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen
              name="SignUpScreen"
              options={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            />
          </Stack>
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </Suspense>
    </UserProvider>
  );
}
