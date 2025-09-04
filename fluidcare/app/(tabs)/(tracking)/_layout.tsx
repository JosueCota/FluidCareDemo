import React from 'react'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'

const layout = () => {
  const {t} = useTranslation();
  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{headerShown:false}}/>
        <Stack.Screen name='IntervalsPage' options={{title:t("tracking-screen-prev-ints")}}/>
        <Stack.Screen name='IntervalForm' options={{title:t("tracking-screen-create-int")}}/>
        <Stack.Screen name='[intervalId]'  options={({route}:{ route: { params?: { intervalDate?: string } }}) => ({
          title: route.params?.intervalDate || "Interval"
        })}/>
        <Stack.Screen name='IntakeGraphs' options={{title:t("tracking-screen-hydration-track")}}/>
        <Stack.Screen name='WeightGraphs' options={{title:t("tracking-screen-weight-track")}}/>
        <Stack.Screen name='DryWeightsPage' options={{title:t("tracking-screen-weight-records")}}/>
      </Stack>
    </>
  )
}

export default layout