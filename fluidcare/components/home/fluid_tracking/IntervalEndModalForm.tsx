import React from "react";
import CustomModal from "../../misc/CustomModal";
import ModalContentWrapper from "../../misc/ModalContentWrapper";
import { Formik } from "formik";
import { View, Text } from "react-native";
import Loader from "../../misc/Loader";
import CustomTextInput from "../../form/CustomTextInput";
import ValidationError from "../../form/ValidationError";
import CustomButton from "../../form/CustomButton";
import { FinalizingIntervalSchema } from "@/utility/yupSchemas";
import { getWeightTag } from "@/utility/utilityFunctions";
import { Units } from "@/utility/types";
import Slider from '@react-native-community/slider';
import InputLabel from "@/components/form/InputLabel";
import { useTranslation } from "react-i18next";

type Props = {
  handleSubmit: ({
    arrivalWeight,
    leavingWeight,
    sentiment
  }: {
    arrivalWeight: number;
    leavingWeight: number;
    sentiment:number
  }) => Promise<void>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  unit: Units;
};

const IntervalEndModalForm = ({
  handleSubmit,
  isOpen,
  setIsOpen,
  loading,
  unit,
}: Props) => {

  const {t} = useTranslation();

  return (
    <CustomModal
      allowClose={false}
      withInput
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ModalContentWrapper
        headerLabel="finalize-interval-header"
        subtitle="finalize-interval-subtitle"
        allowClose={false}
      >
        <Formik
          initialValues={{
            leavingWeight: 0,
            arrivalWeight: 0,
            sentiment:3
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={FinalizingIntervalSchema}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
            <View>
              {loading && <Loader />}
              <CustomTextInput
                id="arrival-weight-modal"
                onChange={handleChange("arrivalWeight")}
                tooltip="finalize-interval-arrival-tip"
                label="finalize-interval-arrival-label"
                value={values.arrivalWeight}
                unit={getWeightTag(unit)}
                keyboardType="number-pad"
              />
              <ValidationError
                touched={touched.arrivalWeight}
                error={errors.arrivalWeight}
              />
              <CustomTextInput
                id="leaving-weight-modal"
                onChange={handleChange("leavingWeight")}
                tooltip="finalize-interval-leaving-tip"
                label="finalize-interval-leaving-label"
                value={values.leavingWeight}
                unit={getWeightTag(unit)}
                keyboardType="number-pad"
              />
              <ValidationError
                touched={touched.leavingWeight}
                error={errors.leavingWeight}
              />
              
              <InputLabel label={`${t("finalize-interval-feeling-label")} ${values.sentiment}`} labelStyle="mb-4 mt-2" tooltip="finalize-interval-feeling-tip"/>
              <Slider
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
              <View className="flex-row justify-between px-4">
                <Text className="text-grey-200 text-xs">{t("finalize-interval-feeling-bad")}</Text>
                <Text className="text-grey-200 text-xs">{t("finalize-interval-feeling-good")}</Text>
              </View>
              
              <ValidationError
                touched={touched.sentiment}
                error={errors.sentiment}
              />

              <CustomButton
                label="btn-submit"
                onPress={handleSubmit}
                style="bg-white border"
                disabled={loading}
              />
            </View>
          )}
        </Formik>
      </ModalContentWrapper>
    </CustomModal>
  );
};

export default IntervalEndModalForm;
