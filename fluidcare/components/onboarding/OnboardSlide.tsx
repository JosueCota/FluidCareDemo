import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, Image } from 'react-native'

export type OnboardSlideProps = {
  imgSrc?: any
  text: string
  title: string
}

const OnboardSlide = ({imgSrc, text, title}:  OnboardSlideProps) => {

  const { t } = useTranslation()
  
  return (
    <ScrollView className={`${imgSrc? "pt-[15%]": "pt-4"} flex-1`} contentContainerStyle={{alignItems:"center", paddingBottom:50}}>
        {imgSrc && <Image
            source={imgSrc}
            className='h-[200px] w-[90%] rounded-3xl bg-grey-300 '
            resizeMode='contain'
        />}
        <Text className={`w-[90%] text-center font-extrabold text-black text-2xl ${imgSrc && "mt-4"} mb-3`}>{t(title)}</Text>
        <Text className='px-3 text-center text-black text-lg w-screen'>{t(text)}</Text>
    </ScrollView>
  )
}

export default OnboardSlide
