import React from 'react'
import { View, Text } from 'react-native'
import { lineDataItem, PieChart, pieDataItem } from 'react-native-gifted-charts'
import LegendTooltip from '../misc/LegendTooltip'
import { useTranslation } from 'react-i18next'

type Props = {
    performance: pieDataItem[],
    intervalAmounts: lineDataItem[],
}

const PerformanceSummaryChart = ({performance, intervalAmounts}: Props) => {
  const {t} = useTranslation();

  const goodPercent = (performance[0].value /(intervalAmounts.length-1) * 100).toFixed(1);
  const okayPercent = (performance[1].value /(intervalAmounts.length-1) * 100).toFixed(1);
  const badPercent = (performance[2].value /(intervalAmounts.length-1) * 100).toFixed(1);

  return (
    <>
    <PieChart
        data={performance}
        donut
        sectionAutoFocus
        radius={90}
        innerRadius={60}
        innerCircleColor={"#DFF5FF"}
        centerLabelComponent={() => (
            <View className='flex items-center'> 
              <Text className='text-2xl font-semibold'>{goodPercent}%</Text>
              <Text className='text-sm font-semibold'>{t("performance-good")}</Text>
            </View>
        )}
        /> 
        <View className=' mt-2 flex-row align-middle items-center justify-around content-center gap-2 flex-wrap p-2 rounded-md'>
            <LegendTooltip tooltip='performance-good-tooltip' style='my-2' iconColor='#9BEFB2' label={`performance-good`} secondaryLabel={`${goodPercent}% (${performance[0].value})`}/>
            <LegendTooltip tooltip='performance-okay-tooltip' style='my-2' iconColor='#FFB76B' label={`performance-okay`} secondaryLabel={`${okayPercent}% (${performance[1].value})`}/>
            <LegendTooltip tooltip='performance-poor-tooltip' style='my-2' iconColor='#FF0000' label={`performance-poor`} secondaryLabel={`${badPercent}% (${performance[2].value})`}/>
    </View>
    <Text className='text-grey-200 px-2 text-center w-[95%] mx-auto mb-4'>{t("performance-summary-subtitle")}</Text>
    </>
  )
}

export default PerformanceSummaryChart
