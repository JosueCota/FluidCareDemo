import { useUser } from "@/context/UserContext";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import CustomTextInput from "../form/CustomTextInput";
import CustomButton from "../form/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFluidTag,
  mlToOz,
  ozToMl,
  showToast,
} from "@/utility/utilityFunctions";
import Loader from "../misc/Loader";
import { useTranslation } from "react-i18next";
import { DailyIntakeScheme } from "@/utility/yupSchemas";
import ValidationError from "../form/ValidationError";

const ChangeFluidIntake = () => {
  const { unit, dailyIntake, setDailyIntake } = useUser();
  const { t } = useTranslation();

  const handleSubmit = async ({
    fluidIntake,
  }: {
    fluidIntake: number | undefined;
  }) => {
    try {
      if (fluidIntake === dailyIntake) {
        showToast("info", t("toast-no-update-header"), t("toast-no-update-message"))
        return;
      };
      let cleanedFluidIntake = fluidIntake;

      if (unit === "imperial") {
        cleanedFluidIntake = ozToMl(fluidIntake!);
      }

      await AsyncStorage.setItem("dailyIntake", cleanedFluidIntake!.toString());
      setDailyIntake(cleanedFluidIntake!);
      showToast(
        "success",
        t("toast-updated"),
        t("fluid-intake-toast-subtitle"),
        2000
      );
    } catch (error) {
      console.log(error);
    }
  };
  if (!dailyIntake) return <Loader />;

  return (
    <View>
      <Formik
        enableReinitialize
        validationSchema={DailyIntakeScheme}
        initialValues={{
          fluidIntake: unit === "imperial" ? mlToOz(dailyIntake!) : dailyIntake,
        }}
        onSubmit={(values) => handleSubmit(values)}
        >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <CustomTextInput
              id="fluid-intake"
              keyboardType="number-pad"
              onChange={handleChange("fluidIntake")}
              defaultValue={values.fluidIntake?.toString()}
              unit={getFluidTag(unit)}
              style="border border-r-0 rounded-l-md mt-2"
              value={values.fluidIntake.toString()}
              unitStyle="border rounded-r-md mt-2"
              label={t("change-fluid-intake-label")}
              subtitle={t("change-fluid-intake-subtitle")}
              />
            <ValidationError
              touched={touched.fluidIntake}
              error={errors.fluidIntake}
              />
            <CustomButton
              style="bg-white border mt-2"
              label="btn-update"
              onPress={handleSubmit}
              />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangeFluidIntake;
