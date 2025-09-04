import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

const PageHeader = ({navigation, route, options, back}: NativeStackHeaderProps) => {
  return (
    <View className='bg-blue-300 mb-0'>
        <View className='bg-blue-300 gap-4 h-[50px] flex-row shadow-lg items-center rounded-md  w-full mx-auto'>
            <TouchableOpacity className='rounded-full ml-4' onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-circle-left' size={28} color={"white"}/>
            </TouchableOpacity>
            <Text className='text-2xl text-white font-medium' numberOfLines={1}>{options.title?.toString()}</Text>
        </View>
    </View>
  )
}

export default PageHeader
