import ChangeFluidIntake from '@/components/settings/ChangeFluidIntake'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

const OtherConfig = () => {
  const {t} = useTranslation();
  return (
    <View className='flex-1 bg-white px-2'>
        <Text className='mt-4 mx-2 px-4 text-center text-grey-200'>{t("settings-other-tab-info")}</Text>
        <ChangeFluidIntake/>
    </View>
  )
}

export default OtherConfig
