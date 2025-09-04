import CustomButton from "@/components/form/CustomButton";
import InputOverflowWrapper from "@/components/form/InputOverflowWrapper";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Formik } from "formik";
import Radio from "@/components/form/Radio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import CustomTextInput from "@/components/form/CustomTextInput";
import { router } from "expo-router";
import { Units } from "@/utility/types";
import MultiSelectBoxes from "@/components/form/MultiSelectBoxes";
import ValidationError from "@/components/form/ValidationError";
import { days } from "@/utility/data";
import { SignupSchema } from "@/utility/yupSchemas";
import {
  daysToArray,
  formatHours,
  formatMinutes,
  getWeightTag,
  showToast,
  timeOfDay,
  timeToDate,
} from "@/utility/utilityFunctions";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/misc/Loader";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { dryWeights, user } from "@/utility/DemoData";

const SignUpScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setUser, setUnit, unit } = useUser();
  

  const updateUnits = (value: Units) => {
    setUnit(value);
    AsyncStorage.setItem("unit", value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await AsyncStorage.setItem("user", "1");
      setUser(1);

      router.replace("/(tabs)/(home)/");

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
    
      const [header, ...rest] = errorMessage.split('\n');
      const body = rest.join('\n').trim();
      
      showToast("error", header, body, 4000 );
    } finally{
      setLoading(false);
    }
  };


  return (
    <ScrollView contentContainerClassName="flex-1 justify-around bg-white">
      <InputOverflowWrapper>
        <Formik
          initialValues={{
            name: user.name,
            dryWeight: dryWeights[0].weight,
            dialDays: daysToArray(user.dial_days),
            dialTime: timeToDate(user.dial_time),
          }}
          validationSchema={SignupSchema}
          onSubmit={() => handleSubmit()}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View className="mx-6">
              <Text className="text-5xl font-semibold text-center mt-14">
                {t("header-sign-up")}
              </Text>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <CustomTextInput
                    id="name"
                    defaultValue={values.name}
                    placeholder={t("input-name-ph")}
                    label={"input-name-label"}
                    onChange={handleChange("name")}
                    />
                  <ValidationError error={errors.name} touched={touched.name} />
                  <Radio
                    checkedValue={unit}
                    label={"input-unit-label"}
                    onChange={updateUnits}
                    options={[
                      { value: "imperial", label: "lb/oz" },
                      { value: "metric", label: "kg/ml" },
                    ]}
                    style="self-center"
                    activeColor="bg-blue-200"
                    />
                  <CustomTextInput
                    id="dry-weight"
                    tooltip="tooltip-dry-weight"
                    unit={getWeightTag(unit)}
                    label={"input-dry-weight-label"}
                    onChange={handleChange("dryWeight")}
                    keyboardType={"number-pad"}
                    />
                  <ValidationError
                    error={errors.dryWeight}
                    touched={touched.dryWeight}
                    />

                  <MultiSelectBoxes
                    options={days}
                    tooltip="tooltip-dial-days"
                    value={values.dialDays}
                    label={"input-dial-days-label"}
                    fieldName="dialDays"
                  />
                  <ValidationError
                    error={String(errors.dialDays)}
                    touched={touched.dialDays}
                  />

                  <CustomDatePicker btnLabel={`${formatHours(values.dialTime)}:${formatMinutes(
                      values.dialTime
                    )} ${timeOfDay(values.dialTime)}`} 
                    inputLabel="input-dial-time-label"
                    inputTip="tooltip-dial-time"
                    value={values.dialTime}
                    
                    setFieldValue={(date:Date) => {
                      setFieldValue("dialTime", date)
                    } }
                    touched={touched.dialTime}
                    error={errors.dialTime}
                    mode={"time"}
                  />
                  <View className="flex-row fixed bottom-0 mb-6 pt-4">
                    <CustomButton
                      onPress={() => router.replace("/OnboardingScreen")}
                      label={t("btn-back")}
                      style="bg-danger"
                    />
                    <CustomButton
                      onPress={handleSubmit}
                      label={t("btn-submit")}
                      style="bg-success"
                    />
                  </View>
                </>
              )}
            </View>
          )}
        </Formik>
      </InputOverflowWrapper>
    </ScrollView>
  );
};

export default SignUpScreen;
