import CustomButton from "@/components/form/CustomButton";
import CustomTextInput from "@/components/form/CustomTextInput";
import InputLabel from "@/components/form/InputLabel";
import MultiSelectBoxes from "@/components/form/MultiSelectBoxes";
import ValidationError from "@/components/form/ValidationError";
import { Formik } from "formik";
import InputOverflowWrapper from "@/components/form/InputOverflowWrapper";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { days } from "@/utility/data";
import {
  daysToArray,
  formatHours,
  formatMinutes,
  timeOfDay,
  timeToDate,
} from "@/utility/utilityFunctions";
import { UpdateUserSchema } from "@/utility/yupSchemas";
import { useTranslation } from "react-i18next";
import Loader from "@/components/misc/Loader";
import { user } from "@/utility/DemoData";

type Init = {
  name: string;
  dialDays: number[];
  dialTime: Date;
};

const ProfileConfig = () => {
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [initVals, setInitVals] = useState<Init | null>(null);

  useEffect(() => {
    refreshUserData();
  }, []);

  const refreshUserData = async () => {
    try {
      const userRes = user;
      
      setInitVals({
        name: userRes.name,
        dialDays: daysToArray(userRes.dial_days),
        dialTime: timeToDate(userRes.dial_time),
      });

      if (!init) {
        setInit(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!init) return <Loader />;

  return (
    <ScrollView className="bg-white flex-1">
      {loading && <Loader />}
      <Formik
        initialValues={{
          name: initVals!.name,
          dialDays: initVals!.dialDays,
          dialTime: initVals!.dialTime,
        }}
        validationSchema={UpdateUserSchema}
        onSubmit={() => {}}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <InputOverflowWrapper>
            <View className="mx-2 gap-1">
              <Text className="mt-4 text-grey-200 px-4 text-center">
                {t("settings-user-tab-info")}
              </Text>
              <CustomTextInput
                id="name"
                placeholder={t("input-name-ph")}
                label={"input-name-label"}
                style="mt-2 border rounded-md"
                onChange={handleChange("name")}
                defaultValue={initVals?.name}
              />
              <ValidationError error={errors.name} touched={touched.name} />
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
              <InputLabel
                label={"input-dial-time-label"}
                tooltip="tooltip-dial-time"
              />
              <CustomButton
                onPress={() => setShowTimePicker((prev) => !prev)}
                label={`${formatHours(values.dialTime)}:${formatMinutes(
                  values.dialTime
                )} ${timeOfDay(values.dialTime)}`}
                style="my-4 bg-white border border-grey-150 w-[100%]"
                textStyle="tracking-[20px] italic text-grey-200"
              />
              {showTimePicker && (
                <DateTimePicker
                  value={values.dialTime}
                  mode="time"
                  minuteInterval={5}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(Platform.OS === "ios");
                    if (selectedDate) {
                      setFieldValue("dialTime", selectedDate);
                    }
                  }}
                />
              )}
              <CustomButton
                onPress={handleSubmit}
                label={t("btn-confirm")}
                style="bg-white border mb-5"
              />
            </View>
          </InputOverflowWrapper>
        )}
      </Formik>
    </ScrollView>
  );
};

export default ProfileConfig;
