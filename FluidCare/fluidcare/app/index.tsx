import { View } from "react-native";
import React, { useCallback } from "react";
import LandingPage from "./LandingScreen";
import { useUser } from "@/context/UserContext";
import { router, useRootNavigationState } from "expo-router";
import { useFocusEffect } from "expo-router";
import Loader from "@/components/misc/Loader";

const index = () => {
  const { user, loading } = useUser();
  const navigationState = useRootNavigationState();

  useFocusEffect(
    useCallback(() => {
      if (navigationState?.key && !loading && user !== -1) {
        router.replace("/(tabs)/(home)/");
      }
    }, [navigationState?.key, loading, user])
  );

  if (loading || !navigationState?.key) {
    return <Loader />;
  }

  return <View className="flex-1">{user === -1 && <LandingPage />}</View>;
};

export default index;
