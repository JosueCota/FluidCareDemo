import React from 'react'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
const layout = () => {
  const {t} = useTranslation();
  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='[medicineGroupId]' options={({route}:{ route: { params?: { groupName?: string } }}) => ({
          title: route.params?.groupName || "Group"
        })}/>
        <Stack.Screen name='MedicationsForm' options={{title:t("create-med-group-header")}}/>
      </Stack>
    </>
  )
}

export default layout