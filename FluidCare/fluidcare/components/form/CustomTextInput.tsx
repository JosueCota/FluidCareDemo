import React, { ChangeEvent, forwardRef } from 'react'
import { View, Text, TextInput, KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native'
import InputLabel from './InputLabel'
import { useTranslation } from 'react-i18next'

type Props = {
    onChange: (e: string | ChangeEvent<any>) => void,
    label?: string,
    placeholder?: string,
    id: string,
    keyboardType?: KeyboardTypeOptions | undefined,
    unit?: string,
    tooltip?: string,
    defaultValue?: string,
    style?: string,
    textBox?:boolean,
    unitStyle?: string,
    value?: string | undefined | number,
    labelStyle?: string,
    subtitle?:string,
    editable?: boolean,
    maxLength?: number,
    returnKeyType?: ReturnKeyTypeOptions
    onSubmitEditing?: () => void,
}

const CustomTextInput = forwardRef<TextInput, Props>(
  (
    {
      value, onChange, label, placeholder, id, keyboardType, unit, tooltip,
      defaultValue, style, textBox, unitStyle, labelStyle, subtitle,
      maxLength, returnKeyType = "default", onSubmitEditing,
    },
    ref
  ) => {
    const {t} = useTranslation();
  return (
    <View className='my-2'>
      {label && <InputLabel label={label} tooltip={tooltip} labelStyle={labelStyle}/>}
        {subtitle && <Text className='text-grey-200 text-sm mx-1'>{t(subtitle)}</Text>}
        <View className='flex-row px-2'>
          <TextInput nativeID={id}
            ref={ref}
            numberOfLines={textBox? 8: 1}
            editable={false}
            placeholder={placeholder && t(placeholder)} 
            onChangeText={onChange}
            value={value?.toString()} 
            className={`bg-white ${!style && "border-b border-b-solid"} text-lg text-grey-200 py-3 px-2 ${textBox && "p-4 align-top"} ${unit?"w-[85%]": "w-[100%]"} ${style} ${"opacity-75 border-b-lightgrey"} border-b-grey-150`} keyboardType={keyboardType || "default"}
            defaultValue={defaultValue}
            maxLength={maxLength}
            multiline={textBox || false}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            />
          {unit && <Text className={`text-center align-middle text-gray-400 float-end ${label && !unitStyle && "border-b border-b-solid"} w-[15%] ${unitStyle} border-b-grey-150 ${"opacity-75 border-b-lightgrey"}`}>{unit}</Text>}
        </View>
    </View>
  )
})
  
export default CustomTextInput
