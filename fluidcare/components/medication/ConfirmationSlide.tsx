import CustomButton from "@/components/form/CustomButton";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  GroupFormData,
  MedicationFormData,
} from "../../app/(tabs)/(medication)/MedicationsForm";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, getDayName } from "@/utility/utilityFunctions";
import InfoCard from "../misc/InfoCard";
import { Medications, MedicationUnits } from "@/utility/types";
import Medication from "./Medication";

type Props = {
  group?: GroupFormData | undefined;
  medicines?: MedicationFormData[] | undefined;
  onFinalize: () => Promise<void>;
  slideScreen: (next: -1 | 1) => void;
};

const ConfirmationSlide = ({
  group,
  medicines,
  onFinalize,
  slideScreen,
}: Props) => {
  const { i18n, t } = useTranslation();

  if (!group || !medicines) return;

  return (
    <View className="w-[100vw]">
      <View className="bg-blue-300 p-4 rounded-b-xl">
        <Text className="text-4xl text-white text-center font-semibold">
          {t("medication-form-conf-header")}
        </Text>
      </View>
      <ScrollView className="w-[95%] mx-auto px-2" contentContainerStyle={{paddingBottom:5}}>
        <Text className="text-3xl font-semibold text-center mb-2 mt-4">
          {group.values.groupName}
        </Text>

        {group.values.notes && (
        <InfoCard label="medication-form-group-notes-label" iconName="article">
          <Text className="text-md text-grey-200">
            {group.values.notes}
          </Text>
        </InfoCard>
        )}
          
        {group.values.reminder && group.values.days && group.values.time && (
          <InfoCard label="med-group-reminder" iconName="calendar-month">
            <Text className="text-md text-grey-200 mt-1">
              {t("medication-form-conf-reminder-1")}
              {group.values.days
                .sort((a, b) => a - b)
                .map((day, index) => (
                  <Text key={`med-group-days-${index}`}>
                    {capitalizeFirstLetter(getDayName(day + 1, i18n.language))}
                    {index + 1 !== group.values.days?.length && ", "}
                  </Text>
                ))}{" "}
              {t("med-group-at")}
              {new Date(group.values.time).toLocaleTimeString(i18n.language, {
                hour12: true,
                minute: "2-digit",
                hour: "2-digit",
              })}{t("medication-form-conf-reminder-2")}
            </Text>
          </InfoCard>
        )}

        <Text className="text-2xl font-semibold mt-2">{t("med-group-medicines")}</Text>
        <View className="border-t border-lightgrey mb-4"></View>
        {medicines.map((med, index) => {
          const medication: Medications = {
            name: med.values.medicationName,
            med_group_id: null!,
            medication_id: index,
            amount: med.values.amount,
            unit: med.values.unit as MedicationUnits,
            notes: med.values.notes,
            refill_reminder: med.values.refillReminder?.toISOString()
          }
          return (
            <Medication med={medication} key={index}/>
        )})}
      </ScrollView>
      <View className="mx-auto w-[100vw] py-2 flex-row justify-around border-t border-gray-200">
        <CustomButton
          label="btn-back"
          textStyle="text-white"
          style="bg-blue-300"
          onPress={() => slideScreen(-1)}
        />
        <CustomButton
          label="btn-confirm"
          textStyle="text-white"
          style="bg-blue-300"
          onPress={() => onFinalize()}
        />
      </View>
    </View>
  );
};

export default ConfirmationSlide;
