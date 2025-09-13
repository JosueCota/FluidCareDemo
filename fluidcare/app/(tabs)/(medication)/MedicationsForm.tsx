import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import { useTranslation } from "react-i18next";
import MedicationGroupSlide from "../../../components/medication/MedicationGroupSlide";
import MedicationFormSlide from "../../../components/medication/MedicationSlide";
import { Slides, Medication_Groups, Medications } from "@/utility/types";
import ConfirmationSlide from "../../../components/medication/ConfirmationSlide";
import { daysToArray, showToast, timeToDate } from "@/utility/utilityFunctions";
import { router } from "expo-router";
import Loader from "@/components/misc/Loader";
import uuid from 'react-native-uuid';
import ChooseCreateTypeSlide from "@/components/medication/ChooseCreateTypeSlide";

export type MedicationValues = {
  medicationName: string;
  amount: number;
  unit: string;
  notes: string | undefined;
  refillReminder: Date | undefined;
};

export type MedicationFormData = {
  values: MedicationValues;
  isValid: boolean;
  id: string;
  dbId?: number
};

export type GroupValues = {
  groupName: string;
  reminder?: boolean;
  days?: number[];
  time?: Date;
  notes?: string;
};

export type GroupFormData = {
  values: GroupValues;
  isValid: boolean;
};

type Props = {
  initGroupData?: Medication_Groups;
  initMedsData?: Medications[];
  mode?: "create" | "edit";
  setEditting?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MedicationsForm = ({
  initGroupData,
  initMedsData,
  mode = "create",
  setEditting,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [groupFormData, setGroupFormData] = useState<GroupFormData>();
  const [medicationFormData, setMedicationFormData] = useState<MedicationFormData[]>();
  const { width } = useWindowDimensions();

  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (initGroupData && initMedsData && mode === "edit") {
      let days: number[] | undefined = undefined;
      let time: Date | undefined = undefined;

      if (initGroupData.days && initGroupData.time) {
        days = daysToArray(initGroupData.days);
        time = timeToDate(initGroupData.time);
      }

      setGroupFormData((prev) => {
        return {
          values: {
            groupName: initGroupData.name,
            reminder: initGroupData.reminder || undefined,
            days: days,
            time: time,
            notes: initGroupData.notes || undefined,
          },
          isValid: true,
        };
      });

      setMedicationFormData((prev) => {
        return initMedsData.map((med, index) => {
          let refillReminder = undefined;

          if (med.refill_reminder) {
            refillReminder = new Date(med.refill_reminder);
          }

          return {
            values: {
              medicationName: med.name,
              amount: med.amount,
              unit: med.unit,
              notes: med.notes,
              refillReminder: refillReminder,
            },
            id: uuid.v4(),
            isValid: true,
            dbId: med.medication_id
          };
        });
      });
    }
  }, []);

  useEffect(() => {
    const offset = currentSlide * width;
    flatListRef?.current?.scrollToOffset({ offset });
  }, [currentSlide]);

  const slideScreen = (next: -1 | 1) => {
    if (currentSlide !== 3 && next === 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (currentSlide !== 0 && next === -1) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleFinalizeEdit = async () => {
    showToast(
      "success",
      t("toast-med-group-edited-header"),
      t("toast-med-group-edited-subtitle")
    );
    setEditting!(false);
  };

  const handleFinalizeCreate = async () => {
    showToast(
        "success",
        t("toast-med-group-created-header"),
        t("toast-med-group-created-subtitle")
      );
    router.back();
  };

  let formSlides: Slides[] = [];
  if (mode === "create") {
    formSlides = [
      { 
        id:"choose",
        component: <ChooseCreateTypeSlide slideScreen={slideScreen}/>
      },
      {
        id: "group",
        component: (
          <MedicationGroupSlide
            setGroupFormData={setGroupFormData}
            slideScreen={slideScreen}
          />
        ),
      },
      {
        id: "medicine",
        component: (
          <MedicationFormSlide
            medicationFormData={medicationFormData}
            slideScreen={slideScreen}
            setMedicationFormData={setMedicationFormData}
          />
        ),
      },
      {
        id: "confirmation",
        component: (
          <ConfirmationSlide
            group={groupFormData}
            medicines={medicationFormData}
            onFinalize={handleFinalizeCreate}
            slideScreen={slideScreen}
          />
        ),
      },
    ];
  } else {
    formSlides = [
      {
        id: "group",
        component: (
          <MedicationGroupSlide
            groupFormData={groupFormData}
            setGroupFormData={setGroupFormData}
            slideScreen={slideScreen}
            setEditting={setEditting}
          />
        ),
      },
      {
        id: "medicine",
        component: (
          <MedicationFormSlide
            medicationFormData={medicationFormData}
            slideScreen={slideScreen}
            mode="edit"
            setMedicationFormData={setMedicationFormData}
          />
        ),
      },
      {
        id: "confirmation",
        component: (
          <ConfirmationSlide
            group={groupFormData}
            medicines={medicationFormData}
            onFinalize={handleFinalizeEdit}
            slideScreen={slideScreen}
          />
        ),
      },
    ];
  }

  if (mode === "edit" && !groupFormData && !medicationFormData)
    return <Loader />;

  return (
    <View className="bg-white h-full">
      <FlatList
        ref={flatListRef}
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={formSlides}
        horizontal
        renderItem={({ item }) => {
          return item.component;
        }}
      />
    </View>
  );
};

export default MedicationsForm;
