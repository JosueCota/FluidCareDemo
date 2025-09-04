import { MaterialIconName } from '@/utility/types'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'

type Props = {
    Icon?: React.FC<SvgProps>,
    iconName?: MaterialIconName,
    size: number,
    onPress: () => Promise<void> | void,
    style?:string,
    color?: string,
    strokeWidth?: number,
    disabled?:boolean
}

const IconButton = ({Icon, iconName, size, onPress, style, color, strokeWidth, disabled=false}: Props) => {
  
    return (
    <TouchableOpacity onPress={onPress} className={`rounded-md p-2 ${style}`} disabled={disabled}>
        {Icon ? 
        <Icon width={size} height={size} color={disabled? "grey": color} strokeWidth={strokeWidth} stroke={strokeWidth? "black": "none"}/>:
        iconName &&
        <MaterialIcons name={iconName} size={size} color={disabled? "grey": color} />
        }
    </TouchableOpacity>
  )
}

export default IconButton
