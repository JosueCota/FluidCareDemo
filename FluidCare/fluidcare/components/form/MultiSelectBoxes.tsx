import { Option } from '@/utility/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View, TouchableOpacity } from 'react-native'
import InputLabel from './InputLabel'

type Props = {
    options: Option[],
    value: string[] | number[],
    label: string,
    fieldName: string,
    tooltip?: string
}

const MultiSelectBoxes = ({options, value, label, tooltip}: Props) => {

  const {t} = useTranslation();

  return (
    <View className='my-2'>
      <InputLabel label={label} tooltip={tooltip}/>
        <View className='flex-row gap-6 flex-wrap justify-center my-2'>
        {   options.map((option) => (
                <TouchableOpacity key={`day${option.value}`} className={` p-6 rounded-md ${(value as (string | number)[]).includes(option.value) ? "bg-blue-200": "bg-lightgrey"}`} disabled onPress={() => {}}>
                    <Text className='font-medium'>{t(option.t)}</Text>
                </TouchableOpacity>
            ))
        }
    </View>
    </View>
  )
}

export default MultiSelectBoxes
