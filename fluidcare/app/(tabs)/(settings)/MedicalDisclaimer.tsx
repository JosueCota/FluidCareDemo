import React from 'react'
import { useTranslation } from 'react-i18next';
import { Text, ScrollView } from 'react-native'

const MedicalDisclaimer = () => {
  const {t} = useTranslation();

  return (
    <ScrollView className='flex-1 bg-grey-100'>
        <Text className='text-xl p-4 my-3 text-center'>{t("medical-disclaimer")}</Text>
    </ScrollView>
  )
}

export default MedicalDisclaimer
