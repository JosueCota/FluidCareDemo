import { Medication_Groups, Medications } from "@/utility/types";
import { capitalizeFirstLetter, daysToArray, formatTime, getDayName, isoToFormattedDate, timeToDate } from "@/utility/utilityFunctions";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView } from "react-native";
import { unitIcons } from "@/utility/data";
import MedicationForm from "./MedicationsForm";
import Loader from "@/components/misc/Loader";
import ConfirmButton from "@/components/form/ConfirmButton";
import { medicationGroups, medications } from "@/utility/DemoData";

const MedicineGroupId = () => {
  const { medicineGroupId } = useLocalSearchParams();
  const { i18n, t } = useTranslation();

  const [groupData, setGroupData] = useState<Medication_Groups>();
  const [medicineData, setMedicineData] = useState<Medications[]>();
  const [editting, setEditting] = useState<boolean>(false);

  useEffect(() => {
    if (!medicineGroupId) return;

    const groupId = Number(medicineGroupId);
    const foundGroup = medicationGroups.find((group) => group.group_id === groupId);
    const meds = medications.filter((med) => med.med_group_id === groupId);

    setGroupData(foundGroup);
    setMedicineData(meds);
  }, []);

  if (!groupData && !medicineData) return <Loader />;

  return (
    <>
      {!editting ? (
        <View className="flex-1 bg-white">
          <ScrollView
            className="px-2 py-4"
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            <View className="p-2">
              <View>
                <Text>
                  
                <Text className="text-xl font-bold">{t("med-group-notes")}: </Text>
                <Text className="text-lg text-grey-200">
                  {groupData?.notes || `No ${t("med-group-notes")}...`}
                </Text>
                </Text>
              </View>

              {groupData?.days && groupData.reminder && groupData.time && (
                <View>
                  <Text className="text-xl font-bold mt-2">
                    {t("med-group-reminder")}:
                  </Text>
                  <Text className="text-lg text-grey-200">{t("med-group-on")} {daysToArray(groupData.days)
                    .map((day, index) => (
                      <Text key={`med-group-days-${index}`}>
                        {index + 1 === daysToArray(groupData.days!).length && t("med-group-and")}
                        {capitalizeFirstLetter(getDayName(day + 1, i18n.language))}
                        {index + 1 !== daysToArray(groupData.days!).length && ", "}
                      </Text>
                    ))} {t("med-group-at")} {formatTime(timeToDate(groupData.time), false)}</Text>
                </View>
              )}
            </View>

            <Text className="text-2xl font-bold my-2 text-center">
              {t("med-group-medicines")}
            </Text>
            {medicineData?.map((med) => {
              const Icon = unitIcons[med.unit];
              return (
                <View
                  key={med.medication_id}
                  className="border-[#eee]  border p-4 rounded-md mb-4"
                >
                  <View className="flex-row  justify-between mb-1">
                    <View className="flex-row gap-1 items-center">
                      <Icon width={28} height={28} />
                      <Text className="text-lg font-semibold">{med.name}</Text>
                    </View>
                    <View className="flex-row gap-2">
                      <Text className="text-lg italic">{med.amount}</Text>
                      <Text className="text-lg italic">{med.unit}(s)</Text>
                    </View>
                  </View>
                  {med.notes && (
                    <View>
                      <Text className="font-semibold">{t("med-group-notes")}:</Text>
                      <Text className="text-grey-200">
                        {"\t"}{med.notes}
                      </Text>
                    </View>
                  )}
                  {med.refill_reminder && (
                    <View className="flex-row gap-2">
                      <Text className="font-semibold">{t("med-group-refill-reminder")}:</Text>
                      <Text className="italic">
                        {isoToFormattedDate(med.refill_reminder, i18n.language)}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
          <View className="py-2 bg-white border-t border-gray-200 flex-row">
            <ConfirmButton
              btnType="button"
              btnLabel="btn-edit"
              disabled={false}
              btnStyle="bg-blue-300 border-0"
              btnTextStyle="text-white"
              deleteFunction={() => setEditting(true)}
              modalSubtitle="med-group-edit-modal"
            />
            <ConfirmButton
              btnType="button"
              deleteFunction={() => {}}
            />
          </View>
        </View>
      ) : (
        <MedicationForm
          mode="edit"
          initGroupData={groupData}
          initMedsData={medicineData}
          setEditting={setEditting}
        />
      )}
    </>
  );
};

export default MedicineGroupId;
