import { TimeFrame } from '@/utility/types'
import React from 'react'
import { View, Text } from 'react-native'
import { LineChart, lineDataItem } from 'react-native-gifted-charts'
import GraphWrapper from '../misc/GraphWrapper'
import LegendTooltip from '../misc/LegendTooltip'
import { useTranslation } from 'react-i18next'

type Props = {
    wetWeightData: lineDataItem[],
    afterDialysisData: lineDataItem[],
    dryWeightData: lineDataItem[]| undefined,
    timeFrame: TimeFrame,
    setTimeFrame:  React.Dispatch<React.SetStateAction<{
    year: number;
    month: number;
    }>>,

}
const DryWeightLineGraph = ({wetWeightData, afterDialysisData, dryWeightData, timeFrame, setTimeFrame}: Props) => {

  const findMin = (): number => {
    if((dryWeightData && dryWeightData.length === 0) || !dryWeightData) {
      return Math.min(...afterDialysisData.map(item => item.value!))
    }
    return Math.min(...dryWeightData.map(item => item.value!))
  }

  const {t} = useTranslation();
  return (
    <GraphWrapper
          dataArrLength={wetWeightData!.length}
          graphLabel={"weight-graph-header"}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          tooltipHeader={"wot-info-header"}
          tooltipContent={"wot-info-content"}
        >
          {wetWeightData.length > 0 && (
            <>
              <LineChart
                data={wetWeightData}
                data2={afterDialysisData}
                data3={dryWeightData}
                color1="#7BAFFD"
                color2="#BF0000"
                spacing={55}
                dataPointsColor="#7BAFFD"
                dataPointsColor2="#BF0000"
                dataPointsColor3="black"
                xAxisLabelTexts={wetWeightData.map((d, i) => {
                  return i !== 0 && d.label ? String(d.label) : "";
                })}
                xAxisLabelTextStyle={{ fontSize: 10, left: 10 }}
                yAxisTextStyle={{ fontSize: 10 }}
                thickness1={5}
                thickness2={5}
                dataPointsRadius1={5}
                dataPointsRadius2={5}
                hideDataPoints3
                curved
                initialSpacing={0}
                overflowTop={10}
                areaChart1
                areaChart2
                startFillColor1="#48E0FB"
                startFillColor2="#F69595"
                endFillColor1="#fff"
                endFillColor2="#fff"
                hideOrigin
                roundToDigits={1}
                noOfSections={4}
                width={240}
                height={200}
                yAxisOffset={findMin()- 5}
                yAxisColor={"lightgrey"}
                xAxisColor={"lightgrey"}
                scrollAnimation
                pointerConfig={{
                  pointerStripColor: "#444",
                  pointerStripWidth: 2,
                  pointer2Color: "#F69595",
                  pointer1Color: "#7BAFFD",
                  pointer3Color: "black",
                  shiftPointerLabelY: -0,
                  shiftPointerLabelX: -45,
                  hidePointer1: true,
                  radius: 4,
                  pointerLabelWidth: 125,
                  pointerLabelComponent: (
                    items: { value: number }[],
                    secondaryItem: any,
                    pointerIndex: number
                  ) => {
                    return (
                      <View className="p-2 bg-grey-300 border flex rounded-md justify-center overflow-visible z-20 items-center">
                        <Text className="text-sm text-center font-bold text-white underline">
                          {wetWeightData[pointerIndex].secondaryLabel} -{" "}
                          {wetWeightData[pointerIndex].label}
                        </Text>
                        <View className="flex-row gap-4 items-center">
                          <View className="flex-col">
                            <Text className="text-white text-xs font-semibold">
                              {t("Arrival")}
                            </Text>
                            <Text className="text-white text-xs text-center">
                              {items[0].value}
                            </Text>
                          </View>
                          <Text className="text-white text-xl">-</Text>
                          <View className="flex-col">
                            <Text className="text-white text-xs font-semibold">
                              {t("Leaving")}
                            </Text>
                            <Text className="text-white text-xs text-center">
                              {items[1].value}
                            </Text>
                          </View>
                        </View>
                        {dryWeightData && 
                        <View className="flex-column border-t-white border-t w-[85%] mt-1 pt-1">
                          <Text className="text-white text-xs text-center">
                            {t("Dry Weight")}: {items[2].value}
                          </Text>
                        </View>
                        }
                      </View>
                    );
                  },
                  pointerStripUptoDataPoint: true,
                  activatePointersOnLongPress: true,
                }}
              />
              <View className="flex-row gap-4 justify-around flex-wrap  p-2 rounded-md mb-1">
                <LegendTooltip
                  right
                  style="my-2"
                  tooltip="weight-graph-tip-arrival-tip"
                  label="weight-graph-tip-arrival"
                  iconColor="#7BAFFD"
                />
                <LegendTooltip
                  tooltipRight={true}
                  style="my-2"
                  tooltip="weight-graph-tip-leaving-tip"
                  label="weight-graph-tip-leaving"
                  iconColor="#F69595"
                />
                <LegendTooltip
                  style="my-2"
                  tooltip="weight-graph-tip-dry-tip"
                  label="weight-graph-tip-dry"
                  iconColor="black"
                />
              </View>
            </>
          )}
    </GraphWrapper>
  )
}

export default DryWeightLineGraph
