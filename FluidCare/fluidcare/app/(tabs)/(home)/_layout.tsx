import React from 'react'
import { Stack } from 'expo-router'

const layout = () => {
  return (
    <>
      <Stack
        screenOptions={{
        }}
      >
        <Stack.Screen name='index' options={{headerShown:false}}/>
      </Stack>
    </>
  )
}

export default layout;