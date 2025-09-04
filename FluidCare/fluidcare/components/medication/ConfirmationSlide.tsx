import CustomButton from "@/components/form/CustomButton";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  GroupFormData,
  MedicationFormData,
} from "../../app/(tabs)/(medication)/MedicationsForm";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, getDayName } from "@/utility/utilityFunctions";

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
      <Text className="text-4xl text-center font-semibold mt-4">
        {t("medication-form-conf-header")}
      </Text>
      <ScrollView className="w-[95%] mx-auto my-2 px-2 mt-4">
        <Text className="text-2xl text-center mb-2">
          {t("medication-form-group-name-label")}
        </Text>
        <Text className="text-3xl font-semibold text-center mb-2">
          {group.values.groupName}
        </Text>

        {group.values.notes && (
          <Text className="text-lg text-grey-200">
            {t("medication-form-group-notes-label")}: {group.values.notes}
          </Text>
        )}
        {group.values.reminder && group.values.days && group.values.time && (
          <Text className="text-lg text-grey-200 mt-1">
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
        )}

        <Text className="text-2xl font-semibold mt-2">{t("med-group-medicines")}</Text>
        <View className="border-t border-lightgrey"></View>
        {medicines.map((med, index) => (
          <View key={index} className="py-4 px-6 bg-lightgrey rounded-md my-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-semibold">
                {med.values.medicationName}
              </Text>
              <Text className="text-md italic text-grey-200">
                {med.values.amount} {med.values.unit}(s)
              </Text>
            </View>
            <View className="mx-2">
              {med.values.notes && (
                <Text className="text-md">{med.values.notes}</Text>
              )}
              {med.values.refillReminder && (
                <Text className="text-md text-grey-200 text-right">
                  {t("medication-form-meds-refill")}
                  {med.values.refillReminder?.toLocaleDateString(
                    i18n.language,
                    { dateStyle: "medium" }
                  )}
                </Text>
              )}
            </View>
          </View>
        ))}
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
