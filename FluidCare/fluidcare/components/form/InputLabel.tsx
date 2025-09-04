import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import Tooltip from '../misc/Tooltip'

type Props = {
  label: string,
  tooltip?:string,
  labelStyle?:string
}

const InputLabel = ({label, tooltip, labelStyle}: Props) => {
  const {t} = useTranslation();
  return (
    <View className='flex-row justify-between items-center w-[95%]'>
      <Text className={`text-lg font-medium ${labelStyle}`}>{t(label)}</Text>
      {tooltip && 
      <Tooltip tooltipText={t(tooltip)}>
          <MaterialIcons name='info' className='float-end' size={16}/>
      </Tooltip>
      } 
    </View>
  )
}

export default InputLabel
