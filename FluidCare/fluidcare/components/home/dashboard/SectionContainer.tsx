import NavButton from '@/components/form/NavButton';
import { MaterialIconName } from '@/utility/types';
import { MaterialIcons } from '@expo/vector-icons';
import { Href } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, Image, ImageSourcePropType, ImageResizeMode } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Props = {
  header: string,
  HeaderIcon?:  React.FC<SvgProps>,
  headerIconName?: MaterialIconName,
  subtitle: string
  iconSize?: number,
  iconStrokeWidth?: number,
  translate?: {y: number, x:number},
  buttonLabel: string,
  imageSource?: ImageSourcePropType,
  imageStyle?: string,
  imageResizeMode?: ImageResizeMode,
  children?: React.ReactNode,
  style?:string,
  href: Href
}

const Section = ({...props}: Props) => {
  const {t} = useTranslation();

  return (
    <View className="bg-grey-100 p-4 rounded-md mb-4 border border-[#ddd] pb-1">
        <View className={`flex-row ${props.style? props.style : "gap-2"}`}>
          {(props.HeaderIcon && <props.HeaderIcon width={props.iconSize} height={props.iconSize} stroke={props.iconStrokeWidth? "black": "none"} strokeWidth={props.iconStrokeWidth} translateX={props.translate?.x} translateY={props.translate?.y}/>) || (props.headerIconName && <MaterialIcons name={props.headerIconName} size={props.iconSize}/>)}

          <Text className="text-2xl font-semibold mb-2">
            {t(props.header)}
          </Text>
        </View>
        <Text className="text-grey-200 mb-2">{t(props.subtitle)}</Text>

        {props.children}

        {props.imageSource &&
          <Image 
          source={props.imageSource}
          resizeMode={props.imageResizeMode}
          className={props.imageStyle || ""}
          />
        }

        <NavButton
          label={t(props.buttonLabel)}
          style="my-0 rounded-full pt-3 pb-3 pl-6 w-full justify-between"
          color="bg-blue-200"
          labelStyle="text-black font-bold text-lg"
          href={props.href}
          />
      </View>
  )
}

export default Section
