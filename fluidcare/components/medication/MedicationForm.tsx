import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CustomTextInput from "../form/CustomTextInput";
import ValidationError from "../form/ValidationError";
import { unitTypes } from "@/utility/data";
import CustomDropdown from "../form/CustomDropdown";
import InputLabel from "../form/InputLabel";
import CustomButton from "../form/CustomButton";
import { useTranslation } from "react-i18next";
import {
  MedicationFormData,
  MedicationValues,
} from "@/app/(tabs)/(medication)/MedicationsForm";
import { capitalizeFirstLetter } from "@/utility/utilityFunctions";
import Checkbox from "../form/Checkbox";
import CustomDatePicker from "../form/CustomDatePicker";
import { MedicationUnits } from "@/utility/types";

type Props = {
  id: string;
  setMedicationFormData: React.Dispatch<
    React.SetStateAction<MedicationFormData[] | undefined>
  >;
  setFormActive: (active: boolean) => void;
  formActive: boolean;
  handleDelete: () => void;
  initValues?: MedicationValues;
  first?: boolean;
};

const MedicationForm = ({
  id,
  setMedicationFormData,
  setFormActive,
  formActive,
  handleDelete,
  initValues,
  first = false,
}: Props) => {
  const { i18n, t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [reminderOn, setReminderOn] = useState(false);

  useEffect(() => {
    if (initValues && initValues.medicationName) {
      setSubmitted(true);
      setFormActive(false);
    } else {
      setFormActive(true);
    }
  }, []);

  const onSubmit = (values: MedicationValues) => {
    setMedicationFormData((prev) => {
      const exists = prev?.some((form) => form.id === id);

      if (exists) {
        return (prev || []).map((form) =>
          form.id === id ? { ...form, values: values, isValid: true } : form
        );
      } else {
        return [
          ...(prev || []),
          {
            values: values,
            isValid: true,
            id: id,
          },
        ];
      }
    });
    setFormActive(false);
    setSubmitted(true);
  };

  const editForm = () => {
    if (formActive) return;
    setSubmitted(false);
    setFormActive(true);
    setMedicationFormData((prev) =>
      (prev || []).map((form) =>
        form.id === id ? { ...form, isValid: false } : form
      )
    );
  };

  return (
    <View className="my-2 w-[100vw] rounded-md ">
      <Formik<MedicationValues>
        enableReinitialize
        initialValues={{
          medicationName: initValues?.medicationName ?? "",
          amount: initValues?.amount ?? 0,
          unit: initValues?.unit ?? "pill",
          notes: initValues?.notes ?? undefined,
          refillReminder: initValues?.refillReminder ?? undefined,
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleSubmit,
          touched,
          errors,
        }) => (
          <View className="w-[95%] mx-auto items-center">
            {submitted ? (
              <View className="flex-row my-1 justify-around items-center w-full">
                <View className="bg-white w-[95%] p-4 elevation-sm rounded-md">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-bold">
                      {values.medicationName}
                    </Text>
                    <Text className="text-lg italic">
                      {values.amount} {values.unit}(s)
                    </Text>
                  </View>
                  <Text className="text-grey-200" numberOfLines={1}>
                    {t("med-group-notes")}: {values.notes ? values.notes : t("medication-form-meds-none")}
                  </Text>
                  {values.refillReminder && (
                    <Text className="mb-2 text-grey-200">
                      {t("medication-form-meds-refill")}
                      {capitalizeFirstLetter(
                        (
                          values.refillReminder || new Date()
                        ).toLocaleDateString(i18n.language, {
                          day: "numeric",
                          month: "short",
                          weekday: "short",
                          year: "numeric",
                        })
                      )}
                    </Text>
                  )}
                  <View className="flex-row my-2">
                    {submitted && first && (
                      <CustomButton
                        onPress={() => handleDelete()}
                        style="bg-white border py-1"
                        label="btn-delete"
                      />
                    )}
                    <CustomButton
                      onPress={() => editForm()}
                      style="bg-white border py-1"
                      label="btn-edit"
                    />
                  </View>
                </View>
              </View>
            ) : (
              <>
                <CustomTextInput
                  label="medication-form-meds-name-label"
                  id={`medication-name-${id}`}
                  placeholder="medication-form-meds-name-ph"
                  onChange={handleChange("medicationName")}
                  style="border rounded-md mt-2"
                  value={values.medicationName}
                />
                <ValidationError
                  touched={touched.medicationName}
                  error={errors.medicationName}
                />
                <View className="flex-row">
                  <View className="w-[50%]">
                    <CustomTextInput
                      label="medication-form-meds-dosage"
                      id={`medication-name-${id}`}
                      onChange={handleChange("amount")}
                      value={values.amount === 0 ? "" : values.amount}
                      style="border rounded-md mt-2"
                      keyboardType="number-pad"
                    />
                    <ValidationError
                      touched={touched.amount}
                      error={errors.amount}
                    />
                  </View>
                  <View className="w-[50%]">
                    <InputLabel label="Unit" labelStyle="mt-2 mb-2" />
                    <CustomDropdown
                      data={unitTypes}
                      value={values.unit}
                      setValue={(val: MedicationUnits) => setFieldValue("unit", val)}
                    />
                  </View>
                </View>

                <InputLabel label="medication-form-group-notes-label" labelStyle="-mx-2" />
                <CustomTextInput
                  id={`medication-notes-${id}`}
                  value={values.notes}
                  onChange={handleChange("notes")}
                  textBox={true}
                  placeholder="medication-form-meds-notes-ph"
                  style="border min-h-[80px] rounded-md content-start"
                />
                <ValidationError
                      touched={touched.notes}
                      error={errors.notes}
                    />
                <Checkbox
                  label="medication-form-meds-refill-set"
                  setIsSelected={setReminderOn}
                  isSelected={reminderOn}
                />
                {reminderOn && (
                  <>
                    <CustomDatePicker
                      btnLabel={
                        (values.refillReminder &&
                          capitalizeFirstLetter(
                            values.refillReminder.toLocaleDateString(
                              i18n.language,
                              {
                                day: "numeric",
                                month: "short",
                                weekday: "short",
                                year: "numeric",
                              }
                            )
                          )) ||
                        t("medication-form-meds-date-ph")
                      }
                      inputLabel="medication-form-meds-date-label"
                      value={values.refillReminder}
                      setFieldValue={(date: Date) => {
                        setFieldValue("refillReminder", date);
                      }}
                      touched={touched.refillReminder}
                      error={errors.refillReminder}
                    />
                  </>
                )}
                <View className="flex-row gap-2 mb-4 mt-2">
                  {first && (
                    <CustomButton
                      style="bg-white border py-1"
                      label="btn-cancel"
                      onPress={() => handleDelete()}
                    />
                  )}
                  <CustomButton
                    style="bg-white border py-1"
                    label="btn-confirm"
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default MedicationForm;
