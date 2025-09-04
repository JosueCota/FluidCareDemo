import React from 'react'
import GraphWrapper from '../misc/GraphWrapper'
import { BarChart, barDataItem } from 'react-native-gifted-charts'
import { View, Text } from 'react-native'
import { useUser } from '@/context/UserContext'
import { getWeightTag } from '@/utility/utilityFunctions'
import { useTranslation } from 'react-i18next'

const SentimentBarGraph = ({barGraphData}: {barGraphData: barDataItem[]}) => {
  const {t} = useTranslation();
  const { unit } = useUser();
  const max = unit === "imperial"? 12 : 6;

  return (
    <GraphWrapper dataArrLength={barGraphData.length} graphLabel={'sentiment-bar-graph-label'} tooltipContent={"sentiment-bar-graph-tooltip-content"} tooltipHeader='sentiment-bar-graph-tooltip-header'>
    <BarChart
        data={barGraphData}
        initialSpacing={15}
        barBorderRadius={4}
        barWidth={25}
        disableScroll
        spacing={35}
        hideRules
        xAxisLabelsHeight={20}
        maxValue={max} 
        yAxisColor={"lightgrey"}
        xAxisColor={"lightgrey"}
        barBorderBottomRightRadius={0}
        barBorderBottomLeftRadius={0}
        noOfSections={3}
        overflowTop={10}
        yAxisLabelSuffix={unit==="imperial"? " lbs" : " kgs"}
        yAxisTextStyle={{fontSize:10}}
        xAxisLength={280}
        renderTooltip={(item: barDataItem) => {
          return (
            <View className={`absolute -top-16 ${item.label === "1" || item.label === "5"? (item.label==="5"? "-left-20" : ""): "-left-10"} overflow-visible bg-grey-200 px-3 py-2 rounded-sm`}>
              <Text className='text-white text-sm font-semibold'>{t("sentiment-bar-graph-average")}: {item.value}{getWeightTag(unit)}s</Text>
              <Text className='text-white text-sm font-semibold'>{t("sentiment-bar-graph-occurance")}: {item.secondaryLabel}</Text>
            </View>
          )
        }}
      />
      <View className='w-[95%]'>
        <View className='ml-[14%] mr-[5%] flex-row w-90% justify-between mb-4'>
          <Text className='text-grey-200 font-semibold'>{t("performance-poor")}</Text>
          <Text className='text-grey-200 font-semibold'>{t("performance-good")}</Text>
        </View>
      </View>
    </GraphWrapper>
  )
}

export default SentimentBarGraph
