import CustomTextInput from "@/components/form/CustomTextInput";
import ValidationError from "@/components/form/ValidationError";
import { useUser } from "@/context/UserContext";
import {
  getFluidTag,
  getWeightTag,
  showToast,
} from "@/utility/utilityFunctions";
import { IntervalSchema } from "@/utility/yupSchemas";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, View, Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import InputLabel from "@/components/form/InputLabel";
import Checkbox from "@/components/form/Checkbox";
import Slider from "@react-native-community/slider";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import ConfirmButton from "@/components/form/ConfirmButton";

type Form = {
  totalAmount: number;
  arrivalWeight: number;
  leavingWeight: number;
  startDate: Date;
  endDate: Date;
  sentiment:number
};

const IntervalForm = () => {
  const [isSentimentSelected, setIsSentimentSelected] = useState(true);
  const { unit } = useUser();
  const { i18n, t } = useTranslation();

  const handleSubmit = async () => {
    try {
      showToast(
        "success",
        t("toast-created"),
        t("created-interval-toast-subtitle")
      );
    } catch (error) {

    }
  }

  return (
    <ScrollView className="bg-white">
      <Text className="text-grey-200 p-4 pb-1 text-center border-grey-200 rounded-md">
        {t("interval-form-note")}
      </Text>
        <Formik
          initialValues={{
            totalAmount: 0,
            arrivalWeight: 0,
            leavingWeight: 0,
            startDate: new Date(),
            endDate: new Date(),
            sentiment: 3
          }}
          validationSchema={IntervalSchema}
          onSubmit={() => handleSubmit()}
          >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View className="mx-4 mb-2">
              <CustomTextInput
                id="total_amout"
                label="interval-total-label"
                onChange={handleChange("totalAmount")}
                value={values.totalAmount}
                keyboardType="number-pad"
                unit={getFluidTag(unit)}
                style="mt-2 border border-r-0 rounded-l-md"
                unitStyle="border rounded-r-md mt-2"
                tooltip="interval-total-tooltip"
                />
              <ValidationError
                touched={touched.totalAmount}
                error={errors.totalAmount}
                />
              <CustomTextInput
                id="arrival_weight"
                label="finalize-interval-arrival-label"
                style="mt-2 border border-r-0 rounded-l-md"
                onChange={handleChange("arrivalWeight")}
                value={values.arrivalWeight}
                keyboardType="number-pad"
                unit={getWeightTag(unit)}
                unitStyle="border rounded-r-md mt-2"
                tooltip="finalize-interval-arrival-tip"
                />
              <ValidationError
                touched={touched.arrivalWeight}
                error={errors.arrivalWeight}
                />
              <CustomTextInput
                id="leaving_weight"
                style="mt-2 border border-r-0 rounded-l-md"
                label="finalize-interval-leaving-label"
                onChange={handleChange("leavingWeight")}
                value={values.leavingWeight}
                keyboardType="number-pad"
                unit={getWeightTag(unit)}
                unitStyle="border rounded-r-md mt-2"
                tooltip="finalize-interval-leaving-tip"
                />
              <ValidationError
                touched={touched.leavingWeight}
                error={errors.leavingWeight}
                />

              <Checkbox label="interval-form-sentiment-interval" setIsSelected={setIsSentimentSelected} isSelected={isSentimentSelected}/>
              {isSentimentSelected && 
              <View>
                <InputLabel label={`${t("finalize-interval-feeling-label")} ${values.sentiment}`} labelStyle="mb-4 mt-2" tooltip="finalize-interval-feeling-tip"/>
                <Slider
                  disabled
                  minimumValue={1}
                  maximumValue={5}
                  lowerLimit={1}
                  step={1}
                  maximumTrackTintColor="#444"
                  minimumTrackTintColor="#7BAFFD"
                  thumbTintColor="#7BAFFD"
                  value={values.sentiment}
                  onSlidingComplete={(val) => setFieldValue("sentiment", val)}
                  
                  />
                <View className="flex-row justify-between px-4 mb-2">
                  <Text className="text-grey-200 text-xs">{t("finalize-interval-feeling-bad")}</Text>
                  <Text className="text-grey-200 text-xs">{t("finalize-interval-feeling-good")}</Text>
                </View>
              </View>
              }


              <CustomDatePicker btnLabel={values.startDate.toLocaleDateString(i18n.language, {
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                  year: "numeric",
                })} 
                
                inputLabel="interval-form-start-date"
                inputTip="interval-form-start-tip"
                value={values.startDate}
                setFieldValue={(date:Date) => {
                  setFieldValue("startDate", date)
                } }
                touched={touched.startDate}
                error={errors.startDate}
                />

              <CustomDatePicker btnLabel={values.endDate.toLocaleDateString(i18n.language, {
                  day: "numeric",
                  month: "short",
                  weekday: "short",
                  year: "numeric",
                })} 
                inputLabel="interval-form-end-date"
                inputTip="interval-form-end-tip"
                value={values.endDate}
                setFieldValue={(date:Date) => {
                  setFieldValue("endDate", date)
                } }
                touched={touched.endDate}
                error={errors.endDate}
                />

              <ConfirmButton btnType={"button"} btnLabel="btn-create" btnStyle="bg-blue-300 w-[50%]" btnTextStyle="text-white"
              deleteFunction={() => handleSubmit()} modalSubtitle="interval-form-submit"/>
              
            </View>
          )}
        </Formik>
    </ScrollView>
  );
};

export default IntervalForm;
