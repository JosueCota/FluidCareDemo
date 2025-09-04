import MedicationForm from "@/components/medication/MedicationForm";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import CustomButton from "@/components/form/CustomButton";
import { MedicationFormData } from "../../app/(tabs)/(medication)/MedicationsForm";
import IconButton from "@/components/form/IconButton";
import uuid from "react-native-uuid";
import { useTranslation } from "react-i18next";

type Props = {
  slideScreen: (next: -1 | 1) => void;
  setMedicationFormData: React.Dispatch<
    React.SetStateAction<MedicationFormData[] | undefined>
  >;
  medicationFormData: MedicationFormData[] | undefined;
  mode?: "edit" | "create";
};

const createEmptyMedication = (id: string): MedicationFormData => ({
  id,
  values: {
    medicationName: "",
    amount: 0,
    unit: "pill",
    notes: undefined,
    refillReminder: undefined,
  },
  isValid: false,
});

const MedicationSlide = ({ mode = "create", ...props }: Props) => {
  const [formActive, setFormActive] = useState(true);
  const {t} = useTranslation();
  useEffect(() => {
    if (!props.medicationFormData || props.medicationFormData.length === 0) {
      props.setMedicationFormData([createEmptyMedication(uuid.v4())]);
    }
  }, []);

  const handleSubmit = () => {
    if (
      props.medicationFormData &&
      Object.values(props.medicationFormData).every((item) => item.isValid)
    ) {
      props.slideScreen(1);
      console.log("successful submit");
    } else {
      console.log("failed submit");
    }
  };

  const handleAdd = () => {
    props.setMedicationFormData((prev) => [
      ...(prev || []),
      createEmptyMedication(uuid.v4()),
    ]);
    setFormActive(true);
  };

  const handleRemove = (id: number) => {
    props.setMedicationFormData((prev) => {
      if (!prev) return prev;
      if (prev.length <= 1) return prev; // At least one med required
      return prev.filter((_, index) => index !== id);
    });
    setFormActive(false);
  };

  return (
    <View>
      <ScrollView className="w-[100vw]">
        <Text className="text-grey-200 w-[95%] mt-4 text-center mx-auto">
          {t("medication-form-meds-subtitle")}
        </Text>

        {props.medicationFormData?.map((med, i) => {
          return (
            <MedicationForm
              key={`medication-form-${i}`}
              formActive={formActive}
              id={med.id}
              first={i !== 0}
              setMedicationFormData={props.setMedicationFormData}
              setFormActive={setFormActive}
              handleDelete={() => handleRemove(i)}
              initValues={med.values}
            />
          );
        })}

        {!formActive && (
          <IconButton
            iconName="add"
            size={24}
            style="bg-success mx-auto my-2"
            onPress={() => handleAdd()}
          />
        )}
      </ScrollView>
      <View className="mx-auto w-[100vw] flex-row justify-around border-t border-gray-200">
        <CustomButton
          label="btn-back"
          style="bg-blue-300  mt-2 mb-2 w-[30%]"
          textStyle="text-white"
          onPress={() => props.slideScreen(-1)}
        />
        <CustomButton
          label="btn-next"
          textStyle="text-white"
          style="bg-blue-300  mt-2 mb-2 w-[30%]"
          disabled={formActive}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default MedicationSlide;
