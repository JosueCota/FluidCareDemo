import React from 'react'
import { useTranslation } from 'react-i18next';
import { Text, ScrollView } from 'react-native'

const MedicalDisclaimer = () => {
  const {t} = useTranslation();

  return (
    <ScrollView className='flex-1 bg-white'>
        <Text className='text-lg p-4 my-4 text-center'>{t("medical-disclaimer")}</Text>
    </ScrollView>
  )
}

export default MedicalDisclaimer
