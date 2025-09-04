import CustomButton from "@/components/form/CustomButton";
import CustomTextInput from "@/components/form/CustomTextInput";
import ValidationError from "@/components/form/ValidationError";
import { SupportEmailSchema } from "@/utility/yupSchemas";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View} from "react-native";

const SendSupportEmail = () => {
  const { t } = useTranslation();  

  return (
    <View className="flex-1 bg-white">
      <Text className="text-center text-md p-3 pb-0 text-grey-200">
        {t("support-message")}
      </Text>
      <Formik
        initialValues={{
          topic: "",
          message: "",
        }}
        validationSchema={SupportEmailSchema}
        onSubmit={() => {}}
      >
        {({ handleChange, errors, touched }) => (
          <View className="px-5">
            <CustomTextInput
              label="input-support-topic-label"
              onChange={handleChange("topic")}
              id="topic"
              placeholder={"input-support-topic-ph"}
              style="border rounded-md mt-2"
            />
            <ValidationError touched={touched.topic} error={errors.topic}/>
            <CustomTextInput
              label="input-support-message-label"
              onChange={handleChange("message")}
              id="message"
              style="border h-[150px] rounded-md mt-3 content-start"
              textBox={true}
              placeholder={"input-support-message-ph"}
            />
            <ValidationError touched={touched.message} error={errors.message}/>
            <CustomButton
              label={t(`btn-send`)}
              onPress={() => {}}
              style="my-4 bg-white border"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SendSupportEmail;
