import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    onPress: () => void,
    label: string,
    style?: string,
    textStyle?: string,
    disabled?: boolean
}


const CustomButton = ({onPress, label, style, textStyle, disabled = false}:Props) => {
    const {t} = useTranslation();
    return (
    <TouchableOpacity disabled={disabled} onPress={() => onPress()} className={`mx-auto min-w-[35%] p-3 rounded-md bg-blue-2 00 ${style}`}>
        <Text className={`text-xl font-medium text-center ${!disabled? textStyle: "text-lightgrey/70"}`}>{t(label)}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton