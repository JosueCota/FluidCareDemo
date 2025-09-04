import Radio from "@/components/form/Radio";
import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

const SystemPreferences = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const { setTheme, setUnit, theme, unit } = useUser();

  useEffect(() => {
    (async () => {
      const u = await AsyncStorage.getItem("unit");
      const t = await AsyncStorage.getItem("theme");

      if (u === "imperial" || u === "metric") {
        setUnit(u);
      }
      if (t === "light" || t === "dark") {
        setTheme(t);
      }
    })();
  }, []);

  useEffect(() => {
    changeLang();
  }, [language]);

  useEffect(() => {
    changeUnits();
  }, [unit]);

  useEffect(() => {
    changeTheme();
  }, [theme]);

  const changeLang = async () => {
    await AsyncStorage.setItem("lang", language);
    await i18n.changeLanguage(language);
  };

  const changeUnits = async () => {
    await AsyncStorage.setItem("unit", unit);
  };

  const changeTheme = async () => {
    await AsyncStorage.setItem("theme", theme);
  };

  return (
    <View className="px-2 bg-white flex-1">
      <Text className="text-grey-200 text-center px-4 mt-4">{t("settings-pref-tab-info")}</Text>
      <Radio
        label="input-lang-label"
        checkedValue={language}
        onChange={setLanguage}
        options={[
          { label: "English", value: "en" },
          { label: "Español", value: "es" },
        ]}
        style="self-center"
        activeColor="bg-blue-200"
      />
      <Radio
        checkedValue={unit}
        label={"input-unit-label"}
        onChange={setUnit}
        options={[
          { value: "imperial", label: "lb/oz" },
          { value: "metric", label: "kg/ml" },
        ]}
        style="self-center"
        activeColor="bg-blue-200"
      />
    </View>
  );
};

export default SystemPreferences;
