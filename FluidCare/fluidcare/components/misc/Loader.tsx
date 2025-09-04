import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
  return (
    <View className='absolute inset-0 items-center justify-center z-50 bg-white/50'>
        <ActivityIndicator size={80}/>
    </View>
  )
}

export default Loader
