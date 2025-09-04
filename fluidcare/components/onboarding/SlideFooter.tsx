import { OnboardSlideProp } from '@/utility/types'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

type Props = {
    currentSlide: number,
    slides: OnboardSlideProp[]
}

const SlideFooter = ({currentSlide, slides}: Props) => {
  return (
    <View className='h-[10%] mx-auto gap-5 flex-row items-center'>
        {slides.map((_, i) => <MaterialIcons name='circle' color={currentSlide >= i ? "white" : "darkgrey"} size={currentSlide !== i ? 24 : 30} key={i}/>)}
    </View>
  )
}

export default SlideFooter
