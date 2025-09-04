import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
import { SvgProps } from 'react-native-svg'
import { MaterialIconName } from '@/utility/types'
import { Href, Link } from 'expo-router'

type Props = {
    label: string,
    color?: string,
    style?: string,
    href: Href,
    labelStyle?:string,
    chevronColor?: string,
    showIcon?:boolean,
    Icon?: React.FC<SvgProps>,
    iconName?: MaterialIconName,
    iconSize?: number,
    iconStrokeWidth?:number,
    children?: React.ReactNode
}

const NavButton = ({label, color, style, labelStyle, chevronColor, showIcon=true, iconName, Icon, iconSize, iconStrokeWidth, href, children}: Props) => {
  const {t} = useTranslation();

  return (
    <Link
    asChild
    href={href}
    >
      <TouchableOpacity className={` mx-auto p-5 my-4 ${style? style: "rounded-md w-[90%]"} ${color? color: "bg-white border"}`} >
        <View className='flex-row justify-between'>
            <View className='flex-row gap-2'>
              {Icon ? 
                <Icon width={iconSize} height={iconSize} color={color} strokeWidth={iconStrokeWidth} stroke={iconStrokeWidth? "black": "none"}/>:
                iconName &&
                <MaterialIcons name={iconName} size={iconSize} color={color} />
              }
              <Text className={`font-semibold ${labelStyle? labelStyle: "text-lg"}`}>{t(label)}</Text>
            </View>
            {showIcon && <MaterialIcons name='chevron-right' size={24} color={chevronColor || "black"}/>}
        </View>
        {children}
      </TouchableOpacity>
    </Link>
  )
}

export default NavButton
