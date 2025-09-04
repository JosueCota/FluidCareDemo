import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View, Text } from "react-native";
import { barDataItem, lineDataItem } from "react-native-gifted-charts";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext";
import { Dry_Weight, Intervals } from "@/utility/types";

import {
  dupeFirstDataPoint,
  isoToFormattedDate,
  kgToPound,
  safeDivide,
} from "@/utility/utilityFunctions";

import DryWeightLineGraph from "@/components/tracking/WeightLineGraph";
import SentimentBarGraph from "@/components/tracking/SentimentBarGraph";
import { dryWeights, intervals } from "@/utility/DemoData";
import { currentTimeFrame } from "@/utility/data";

const WeightGraphs = () => {
  const { t, i18n } = useTranslation();
  const { unit } = useUser();

  const [arrivalAmounts, setArrivalAmounts] = useState<lineDataItem[]>();
  const [leavingAmounts, setLeavingAmounts] = useState<lineDataItem[]>();
  const [dryWeightAmounts, setDryWeightAmounts] = useState<lineDataItem[] | undefined>(undefined);
  const [sentimentBarGraphData, setSentimentBarGraphData] = useState<barDataItem[]>();
  const [averageSentiment, setAverageSentiment] = useState(0);

  const [loading, setLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState(currentTimeFrame());

  useEffect(() => {
    getData();
  }, [unit, timeFrame]);

  const getData = async () => {
    try {
      setLoading(true);

      const cleanedWeightData = intervals.filter(
        (int) => int.leaving_weight !== null || int.arrival_weight !== null
      );

      const cleanedSentimentData = cleanedWeightData.filter(
        (int) => int.sentiment !== null
      )

      const leavingAmounts = cleanedWeightData.map((interval) => {
        let val = interval.leaving_weight != null ? Number(interval.leaving_weight) : 0;
        if (isNaN(val)) val = 0;
        if (unit === "imperial") {
          val = kgToPound(val);
        }
        return { value: val };
      });

      if (cleanedWeightData.length >= 1){ 
        const totalSentiment = cleanedWeightData.reduce((accumulator, curr) => {
          return accumulator + Number(curr.sentiment);
        }, 0)

        setAverageSentiment(() => {
          return Number((totalSentiment/cleanedWeightData.length).toFixed(2))
        });
      }

      const arrivalAmounts = cleanedWeightData.map((interval) => {
        const endDate = isoToFormattedDate(interval.end_date, i18n.language);
        const startDate = isoToFormattedDate(
          interval.start_date,
          i18n.language
        );
        let val = interval.arrival_weight != null ? Number(interval.arrival_weight) : 0;
        if (isNaN(val)) val = 0;

        if (unit === "imperial") {
          val = kgToPound(val);
        }
        return { value: val, label: endDate, secondaryLabel: startDate };
      });

      if (arrivalAmounts.length === 0) {
        setArrivalAmounts([]);
        setLeavingAmounts([]);
        setDryWeightAmounts([]);
        setSentimentBarGraphData([]);
        return;
      }

      dupeFirstDataPoint(leavingAmounts);
      dupeFirstDataPoint(arrivalAmounts);

      setLeavingAmounts(leavingAmounts);
      setArrivalAmounts(arrivalAmounts);
      
      let cleanedDryWeights: lineDataItem[] = [];
      
      if (dryWeights.length !== 0) {
        
        cleanedWeightData.forEach((int) => {
        const arrivalDate = new Date(int.end_date).getTime();
        
        let matchingDryWeight = dryWeights[0]; 
        
        for (let i = 0; i < dryWeights.length; i++) {
          const dryWeight = dryWeights[i];
          if (!dryWeight.date) continue;
          const dryDate = new Date(dryWeight.date).getTime();
          
          if (dryDate <= arrivalDate) {
            matchingDryWeight = dryWeights[i];
          } else {
            break;
          }
        }
        let value = 0;
        if (matchingDryWeight.weight){
          value = matchingDryWeight.weight!;
        }
        
        if (unit === "imperial" && value) {
          value = kgToPound(value);
        }
        
        cleanedDryWeights.push({ value });
      });
      
      setDryWeightAmounts(cleanedDryWeights);
    }
      
      const sentimentData = getSentimentBarData(cleanedSentimentData)

      setSentimentBarGraphData(sentimentData);
      dupeFirstDataPoint(cleanedDryWeights);

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  const getSentimentBarData = (intervals: Intervals[]):barDataItem[] => {
    const item: Record<string, number[]> = {
      "1": [0,0],
      "2": [0,0],
      "3": [0,0],
      "4": [0,0],
      "5": [0,0],
    };

    const barColors = [
      "#FF5601",
      "#FFC067",
      "#FDFAA5",
      "#9BEFB2",
      "#56ae57",
  ]

    intervals.forEach((int) => {
      const sentiment = int.sentiment?.toString();
      if (!sentiment || int.arrival_weight == null || int.leaving_weight == null) return;

      let weightRemoved = Number(int.arrival_weight) - Number(int.leaving_weight);

      if (unit === "imperial") {
        weightRemoved = kgToPound(weightRemoved);
      } 

      if (!item[sentiment]) {
        item[sentiment] = [0, 0];
      }

      item[sentiment][0] += weightRemoved;
      item[sentiment][1] += 1;
    });

    const result: barDataItem[] = Object.entries(item).map(([sentiment, [total, count]], index) => ({
      label: sentiment,
      value: safeDivide(total, count),
      frontColor: barColors[index],
      secondaryLabel: count.toString()
    }));

    return result;
  }

  return (
    <ScrollView className="bg-white pt-2" refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getData()}/>}>
      {arrivalAmounts && leavingAmounts && sentimentBarGraphData && !loading && (
        <View className="mb-4">
          <DryWeightLineGraph dryWeightData={dryWeightAmounts} afterDialysisData={leavingAmounts} wetWeightData={arrivalAmounts} timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
          <SentimentBarGraph barGraphData={sentimentBarGraphData}/>
          <View className="bg-white p-4 rounded-lg elevation-sm shadow-lg mx-auto my-2 mb-4 w-[95%]">
            <Text className='font-bold text-xl'>{t("perceived-wellness-1")}
            <Text className='font-bold text-2xl'> {averageSentiment}</Text></Text>
            <Text className='text-grey-200'>{t("perceived-wellness-2")}</Text>
            <Text className='text-grey-200'>{t("perceived-wellness-3")}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WeightGraphs;
