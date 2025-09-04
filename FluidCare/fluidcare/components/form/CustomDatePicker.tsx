import React, { useState } from 'react'
import InputLabel from './InputLabel';
import CustomButton from './CustomButton';
import ValidationError from './ValidationError';
import { Platform } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormikErrors, FormikTouched } from 'formik';
import { useTranslation } from 'react-i18next';

type Props = {
    inputLabel: string,
    inputTip?: string,
    btnLabel: string,
    value: Date | undefined,
    setFieldValue: (date: Date) => void,
    touched: FormikTouched<Date> | undefined,
    error: FormikErrors<Date> | undefined,
    mode?: "date" | "time" | "datetime",
    btnTextStyle?: string,
    btnStyle?: string
}

const CustomDatePicker = ({inputLabel, inputTip, btnLabel, value, setFieldValue, touched, error, mode="date", btnTextStyle, btnStyle}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {t} = useTranslation();

  return (
    <>
        <InputLabel
        label={t(inputLabel)}
        tooltip={t(inputTip || "")}
        />
        <CustomButton
        label={btnLabel}
        disabled
        onPress={() => setShowDatePicker((prev) => !prev)}
        style={`my-2 bg-white border border-grey-150 w-[100%] ${btnStyle}`}
        textStyle={`text-grey-200 ${btnTextStyle}`}
        />
        <ValidationError
        error={error as string}
        touched={!!touched}
        />

        {showDatePicker && (
            <DateTimePicker
            disabled
            value={value || new Date()}
            mode={mode}
            display={Platform.OS === "ios" ? "default" : "default"}
            onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === "ios");
                if (selectedDate) {
                    setFieldValue(selectedDate);
                }
            }}
            />
        )}
    </>
  )
}

export default CustomDatePicker
