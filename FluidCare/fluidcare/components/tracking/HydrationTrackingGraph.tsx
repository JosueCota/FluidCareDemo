import React from 'react'
import { View, Text } from 'react-native';
import { CurveType, LineChart, lineDataItem } from 'react-native-gifted-charts';
import { useUser } from '@/context/UserContext';
import LegendTooltip from '../misc/LegendTooltip';
import Loader from '../misc/Loader';
import { mlToOz } from '@/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

type Props = {
    recommendedAmounts: lineDataItem[],
    intervalAmounts: lineDataItem[],
    average: number
}

const HydrationTrackingGraph = ({recommendedAmounts, intervalAmounts, average}: Props) => {
  const {t} = useTranslation();
  const {unit, dailyIntake} = useUser();

  const getMaxRoundedValue = () => {
    const allValues = [
      ...(recommendedAmounts ?? []).map(d => d.value).filter((v): v is number => v !== undefined),
      ...(intervalAmounts ?? []).map(d => d.value).filter((v): v is number => v !== undefined)
    ];
    const max = Math.max(...allValues);
    if (unit === "imperial") {
      return Math.ceil(max/10) * 10 + 50;
    }
    return Math.ceil(max / 1000) * 1000 + 500;
  };
  
  if (!recommendedAmounts || !intervalAmounts || recommendedAmounts.length === 0 ||  intervalAmounts.length === 0) return <Loader/>

  return (
    <>
    <LineChart
        key={"hydration-tracking-graph"}
        data={recommendedAmounts}
        data2={intervalAmounts}
        color1='green'
        color2='#7BAFFD'
        areaChart1
        areaChart2
        spacing={55}
        hideDataPoints1
        startFillColor1="#9BEFB2"
        startFillColor2="rgb(46, 217, 255)"
        endFillColor1="#DFF5FF"
        endFillColor2="#FFF"
        startOpacity2={0.8}
        dataPointsColor2='#7BAFFD'
        curved
        xAxisLabelTexts={intervalAmounts.map((d,i)=> {return (i !== 0 && d.label ? String(d.label) : '')})}
        xAxisLabelTextStyle={{fontSize:10, left:10}}
        yAxisTextStyle={{fontSize:10}}
        thickness1={3}
        roundToDigits={5}
        thickness2={3}
        initialSpacing={0}
        overflowTop={10}
        hideOrigin
        curveType={CurveType.QUADRATIC}
        noOfSections={4}
        width={260}
        
        parentWidth={260}
        xAxisLength={260}
        height={200}  
        maxValue={getMaxRoundedValue()}
        yAxisColor={"lightgrey"}
        xAxisColor={"lightgrey"}      
        pointerConfig={{
            pointerStripColor: '#444',
            pointerStripWidth: 2,
            pointer2Color: '#7BAFFD',
            pointer1Color:"#9BEFB2",
            radius: 4,
            shiftPointerLabelY:20,
            shiftPointerLabelX:-40,
            activatePointersOnLongPress:true,
            pointerLabelWidth: 100,
            pointerLabelComponent: (items: { value: number }[], secondaryItem: any, pointerIndex: number) => {
              const recommended = items[0]?.value ?? '-';
              const actual = items[1]?.value ?? '-';
              const label = intervalAmounts[pointerIndex]?.label ?? '';
              const secondaryLabel = intervalAmounts[pointerIndex]?.secondaryLabel ?? '';

              return (
                <View className='p-2 bg-grey-300 border flex rounded-md justify-center overflow-visible z-20'>
                  <Text className='text-center text-sm font-bold text-white underline'>
                    {secondaryLabel} - {label}
                  </Text>
                  <View className='flex-column flex-wrap items-start pl-2'>
                    <Text className="text-white text-xs">🔵 {actual}</Text>
                    <Text className="text-white text-xs">🟢 {recommended}</Text>
                  </View>
                </View>
              );
            }
          }}
        />
        <View className='flex-row gap-4 justify-around flex-wrap p-2 rounded-md'>
          <LegendTooltip tooltipRight={true} style='mt-2' tooltip='hydration-tracking-actual-tooltip' label='hydration-tracking-actual' iconColor='#7BAFFD'/>
          <LegendTooltip style='mt-2' tooltip='hydration-tracking-recommended-tooltip' label='hydration-tracking-recommended' iconColor='#9BEFB2'/>
        </View>
        <View className="p-4 rounded-lg  mx-auto my-2 w-[95%] ">
          <Text className='font-bold text-3xl'>{t("hydration-tracking-avg-header")}</Text>
          <Text className='font-bold text-2xl'>{average}/
          <Text className='text-grey-200 font-semibold text-xl'>{unit==="imperial"? mlToOz(dailyIntake): dailyIntake}</Text></Text> 
          <Text className='text-grey-200'>{average < dailyIntake ? t("hydration-tracking-avg-statement-1") : t("hydration-tracking-avg-statement-2")}</Text>
        </View>
        </>
  )
}

export default HydrationTrackingGraph
