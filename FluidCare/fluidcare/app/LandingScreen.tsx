import { router } from "expo-router";
import { Text, View } from "react-native";
import CustomButton from "../components/form/CustomButton";
import Radio from "../components/form/Radio";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function LandingScreen() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    changeLang();
  }, [language]);

  const changeLang = async () => {
    await AsyncStorage.setItem("lang", language);
    await i18n.changeLanguage(language);
  };

  return (
    <View className="flex-1 items-center bg-offwhite">
      <Text className="text-5xl font-bold bg-blue-300 p-6 rounded-md mt-16 mb-3">
        <Text className="text-blue-100">Fluid</Text>
        <Text className="text-success">Care</Text>
      </Text>
      <View>
        <Radio
          options={[
            { label: "English", value: "en" },
            { label: "Español", value: "es" },
          ]}
          checkedValue={language}
          onChange={setLanguage}
        />
      </View>
      <View className="absolute bottom-[20%] w-full">
        <CustomButton
          onPress={() => router.replace("/OnboardingScreen")}
          label={t("btn-get-started")}
          style="bg-white border py-4"
        />
      </View>
    </View>
  );
}
