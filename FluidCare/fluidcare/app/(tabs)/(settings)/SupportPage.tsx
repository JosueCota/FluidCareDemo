import NavButton from "@/components/form/NavButton";
import Accordion from "@/components/misc/Accordion";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text } from "react-native";

const SupportPage = () => {
  
  const { t } = useTranslation();
  
  return (
    <ScrollView className="flex-1 bg-white">
      <NavButton style="w-[95%] rounded-md my-4 py-3" color="bg-white border border-[#eee]" labelStyle="text-xl" href={"/(tabs)/(settings)/SendSupportEmail"} label="supp-send-ticket" iconName="mail" iconSize={24}/>

      <View className="bg-white border-t border-lightgrey">
        <Text className="text-3xl mb-3 mt-6 font-semibold text-center">{t("supp-header")}</Text>
        <Accordion  label="supp-q-1" content="supp-a-1"/>
        <Accordion label="supp-q-2" content="supp-a-2"/>
        <Accordion label="supp-q-3" content="supp-a-3"/>
        <Accordion label="supp-q-4" content="supp-a-4"/>
        <Accordion label="supp-q-5" content="supp-a-5"/>
        <Accordion label="supp-q-6" content="supp-a-6"/>
      </View>

    </ScrollView>
  );
};

export default SupportPage;
