import Accordion from '@/components/misc/Accordion'
import { generalQuestions, intakeQuestions, weightQuestions } from '@/utility/data'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, ScrollView } from 'react-native'

const ReadMore = () => {
  const {t} = useTranslation();

  return (
    <ScrollView className='bg-white'>
        <Text className='text-center text-2xl font-bold mt-4 mb-2'>{t("faq-general-header")}</Text>
        <View className='border-t mb-2 w-[90%] mx-auto'></View>
        {generalQuestions.map((question, index) => {
          return (<Accordion key={question.label} label={question.label} content={question.content} />)
        })}
        
        <Text className='text-2xl font-bold mt-8 mb-2 text-center'>{t("faq-fluid-header")}</Text>
        
        <View className='border-t mb-2 w-[90%] mx-auto'></View>
        {intakeQuestions.map((question, index) => {
          return (<Accordion key={question.label}  label={question.label} content={question.content} />)
        })}
        
        
        <Text className='text-2xl font-bold mt-8 mb-2 text-center'>{t("faq-weight-header")}</Text>
        
        <View  className='border-t mb-2 w-[90%] mx-auto'></View>
        {weightQuestions.map((question, index) => {
          return (<Accordion key={question.label} label={question.label} content={question.content} />)
        })}
    </ScrollView>
  )
}

export default ReadMore
