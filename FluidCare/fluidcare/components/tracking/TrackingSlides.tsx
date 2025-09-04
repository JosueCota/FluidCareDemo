import { useUser } from '@/context/UserContext'
import { mlToOz } from '@/utility/utilityFunctions'
import { t } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image } from 'react-native'

export const TrackingSlides1 = () => {
  const {t} = useTranslation();

  return (
  <View className="h-full items-center ">
    <Text className="text-2xl font-bold self-start">{t("tracking-slide-header")}</Text>
    <Text className=" text-grey-200 self-start">{t("tracking-slide-subtitle")}</Text>
    <Image
      source={require("@/assets/images/AnalyzingData.png")}
      resizeMode="cover"
      className="w-full max-w-[270px] h-[130px]"
    />
  </View>
  )
}

export const TrackingSlides2 = ({averageIntake} : {averageIntake: number}) => {
  const { dailyIntake, unit } = useUser();
  return (
    <View className="h-full">
      <Text className='font-bold text-2xl'>{t("hydration-tracking-avg-header")}</Text>
      <Text className='font-bold text-2xl'>{averageIntake}/
      <Text className='text-grey-200 font-semibold text-xl'>{unit==="imperial"? mlToOz(dailyIntake): dailyIntake}</Text></Text> 
      <Text className='text-grey-200'>{averageIntake < dailyIntake ? t("hydration-tracking-avg-statement-1"): t("hydration-tracking-avg-statement-1")}</Text>
    </View>
  )
}

export const TrackingSlides3 = ({averageSentiment} : {averageSentiment: number}) => {
  const {t} = useTranslation();
  return (
    <View className="h-full">
      <Text className='font-bold text-2xl'>{t("tracking-slide-avg-sent-header")}</Text>
      <Text className='font-bold text-2xl'>{averageSentiment}/<Text className='text-grey-200 font-semibold text-xl'>5</Text></Text>
      <Text className='text-grey-200'>{t("tracking-slide-avg-sent-content")}</Text>
    </View>
  )
}

