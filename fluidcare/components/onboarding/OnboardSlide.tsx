import { OnboardSlideProp } from '@/utility/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image } from 'react-native'

const OnboardSlide = ({item}: {item: OnboardSlideProp}) => {

  const { t } = useTranslation()
  
  return (
    <View className="items-center mt-[60px]">
        <Image
            source={item.imgSrc}
            className='h-[300px] w-screen'
        />
        <Text className='text-center font-extrabold text-white text-2xl mt-4 mb-3'>{t(item.title)}</Text>
        <Text className='px-8 text-center text-white text-lg w-screen'>{t(item.text)}</Text>
    </View>
  )
}

export default OnboardSlide
