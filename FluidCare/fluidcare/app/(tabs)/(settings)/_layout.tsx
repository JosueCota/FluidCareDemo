import React from 'react'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

const layout = () => {
  const {t} = useTranslation();

  return (
      <Stack
        initialRouteName='index'
      >
        <Stack.Screen name='Configurations' options={{title:t("nav-config")}}/>
        <Stack.Screen name='index'  options={{headerShown:false}}/>
        <Stack.Screen name='MedicalDisclaimer' options={{title:t("nav-med-discl")}}/>
        <Stack.Screen name='NotificationsPage'  options={{title:t("nav-notifications")}}/>
        <Stack.Screen name='SupportPage' options={{title:t("nav-support")}}/>
        <Stack.Screen name='SendSupportEmail'  options={{title:t("nav-support-email")}}/>
      </Stack>
  )
}

export default layout