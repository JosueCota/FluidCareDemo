import { MaterialIconName } from '@/utility/types'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'
import { SvgProps } from 'react-native-svg'

type Props = {
    label: string,
    header?: string,
    subtitle?: string
    Icon?: React.FC<SvgProps>,
    iconName?: MaterialIconName,
    iconSize?: number,
    iconColor?: string,
    children: React.ReactNode
}

const InfoCard = ({header, label, subtitle, Icon, iconName, iconSize, iconColor, children}: Props) => {
  const {t} = useTranslation();
  
  return (
    <View className='mb-1'>
        {header && <Text className="text-2xl font-bold py-3 bg-white">{t(header)}</Text>}
        {header && subtitle && <Text className="text-grey-200 text-sm mx-4 mb-2">{t(subtitle)}</Text>}
        <View className="grid grid-cols-2 gap-3 mb-2 w-full mx-auto">
            <View className="border border-[#eee] bg-white p-4 rounded-md">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold">{t(label)}</Text>
                    {Icon && <Icon height={iconSize || 24} width={iconSize || 24} color={iconColor}/>}
                    {iconName && <MaterialIcons name={iconName} size={iconSize || 24} color={iconColor}/>}
                </View>
                {children}
            </View>
        </View>
    </View>
  )
}

export default InfoCard
