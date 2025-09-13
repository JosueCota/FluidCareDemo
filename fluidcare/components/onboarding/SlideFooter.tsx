import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

type Props = {
    currentSlide: number,
    slideLength: number
}

const SlideFooter = ({currentSlide, slideLength}: Props) => {
  return (
    <View className='h-[5%] mx-auto gap-5 flex-row items-center'>
        {Array.from({length: slideLength}).map((_, i) => <MaterialIcons name='circle' color={currentSlide >= i ? "#322F2F" : "darkgrey"} size={currentSlide !== i ? 24 : 30} key={i}/>)}
    </View>
  )
}

export default SlideFooter
