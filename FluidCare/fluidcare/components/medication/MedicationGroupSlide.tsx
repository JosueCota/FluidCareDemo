import Checkbox from "@/components/form/Checkbox";
import CustomButton from "@/components/form/CustomButton";
import CustomTextInput from "@/components/form/CustomTextInput";
import MultiSelectBoxes from "@/components/form/MultiSelectBoxes";
import ValidationError from "@/components/form/ValidationError";
import { CreateMedGroupSchema } from "@/utility/yupSchemas";
import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  formatHours,
  formatMinutes,
  timeOfDay,
} from "@/utility/utilityFunctions";
import { days } from "@/utility/data";
import {
  GroupFormData,
  GroupValues,
} from "../../app/(tabs)/(medication)/MedicationsForm";
import CustomDatePicker from "@/components/form/CustomDatePicker";

type Props = {
  slideScreen: (next: -1 | 1) => void;
  setGroupFormData: React.Dispatch<
    React.SetStateAction<GroupFormData | undefined>
  >;
  groupFormData?: GroupFormData;
  setEditting?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MedicationGroupSlide = ({ ...props }: Props) => {
  const { t } = useTranslation();
  const handleSubmit = (values: GroupValues) => {
    props.setGroupFormData(() => {
      return {
        values: values,
        isValid: true,
      };
    });
    props.slideScreen(1);
    console.log("Saved Medication Group");
  };
  return (
    <View className="w-[100vw]">
      <Formik<GroupValues>
        initialValues={{
          groupName: props.groupFormData?.values.groupName ?? "",
          reminder: props.groupFormData?.values.reminder ?? true,
          days: props.groupFormData?.values.days ?? [],
          time:
            props.groupFormData?.values.time ??
            new Date(2024, 5, 24, 12, 0, 0, 0),
          notes: props.groupFormData?.values.notes ?? "",
        }}
        enableReinitialize
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleSubmit,
          values,
          setFieldValue,
          handleChange,
          touched,
          errors,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
          >
            <ScrollView className="w-[95%] flex-1 mx-auto">
              <Text className="text-grey-200 mt-4 text-center border-grey-200 rounded-md ">
                {t("medication-form-group-subtitle")}
              </Text>
              <CustomTextInput
                id="med-group-name"
                label="medication-form-group-name-label"
                onChange={handleChange("groupName")}
                placeholder='medication-form-group-name-ph'
                style="mt-2 border rounded-md"
                value={values.groupName}
                maxLength={50}
              />
              <ValidationError
                touched={touched.groupName}
                error={errors.groupName}
              />
              <CustomTextInput
                id="med-group-notes"
                label="medication-form-group-notes-label"
                onChange={handleChange("notes")}
                value={values.notes}
                placeholder="medication-form-group-notes-ph"
                style="border h-[100px] rounded-md mt-3 content-start"
                textBox={true}
              />
              <ValidationError touched={touched.notes} error={errors.notes} />
              <Checkbox
                label="medication-form-group-reminder"
                isSelected={values.reminder!}
                setIsSelected={() =>
                  setFieldValue("reminder", !values.reminder)
                }
              />

              {values.reminder && (
                <>
                  <MultiSelectBoxes
                    options={days}
                    value={values.days || []}
                    label={"medication-form-group-days-label"}
                    fieldName="days"
                  />
                  <ValidationError
                    error={String(errors.days)}
                    touched={touched.days}
                  />

                  <CustomDatePicker
                    inputLabel={"medication-form-group-time-label"}
                    btnLabel={`${formatHours(values.time!)}:${formatMinutes(
                      values.time!
                    )} ${timeOfDay(values.time!)}`}
                    value={values.time}
                    setFieldValue={(date: Date) => {
                      setFieldValue("time", date);
                    }}
                    btnTextStyle="tracking-[20px] italic"
                    btnStyle="mb-6"
                    touched={touched.time}
                    error={touched.time}
                    mode="time"
                  />
                </>
              )}
            </ScrollView>
            <View className="py-2 bg-white border-t border-gray-200 flex-row ">
              {props.setEditting && (
                <CustomButton
                  label="btn-cancel"
                  textStyle="text-white"
                  style="bg-blue-300  w-[30%]"
                  onPress={() => props.setEditting!(false)}
                />
              )}
              <CustomButton
                label="btn-next"
                textStyle="text-white"
                style={`bg-blue-300  ${
                  props.setEditting ? "w-[30%]" : "w-[50%]"
                }`}
                onPress={handleSubmit}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default MedicationGroupSlide;
