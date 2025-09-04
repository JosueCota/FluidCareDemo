import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text } from 'react-native'
import Tooltip from './Tooltip'
import { MaterialIconName } from '@/utility/types'
import { useTranslation } from 'react-i18next'

type Props = {
    tooltip:string,
    label?: string,
    secondaryLabel?: string,
    iconName?: MaterialIconName,
    style?:string,
    tooltipRight?:boolean,
    iconColor: string,
    right?:boolean
}

const LegendTooltip = ({label, secondaryLabel, iconName, style, tooltip, iconColor, right=false}: Props) => {
  const {t} = useTranslation();

  return (
    <Tooltip tooltipText={t(tooltip)} right={right}>
        <View className={`flex-row gap-2 items-center ${style}`}>
            <MaterialIcons name={iconName? iconName: 'circle'} color={iconColor}/>
            {label && <Text className='font-semibold'>{t(label)}{secondaryLabel && ":"}</Text>}
            {secondaryLabel && <Text className='italic'>{t(secondaryLabel)}</Text>}
        </View>
    </Tooltip>
  )
}

export default LegendTooltip
