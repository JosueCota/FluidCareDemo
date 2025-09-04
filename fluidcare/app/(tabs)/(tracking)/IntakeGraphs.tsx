import { ScrollView, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { lineDataItem, pieDataItem } from "react-native-gifted-charts";
import { TimeFrame } from "@/utility/types";
import {
  dupeFirstDataPoint,
  getDaysInInterval,
  isoToFormattedDate,
  mlToOz,
} from "@/utility/utilityFunctions";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext";
import HydrationTrackingGraph from "../../../components/tracking/HydrationTrackingGraph";
import PerformanceSummaryChart from "../../../components/tracking/PerformanceSummaryChart";
import GraphWrapper from "../../../components/misc/GraphWrapper";
import { currentTimeFrame } from "@/utility/data";
import { intervals } from "@/utility/DemoData";

const IntakeGraphs = () => {
  const [intervalAmounts, setIntervalAmounts] = useState<lineDataItem[]>();
  const [recommendedAmount, setRecommendedAmount] = useState<lineDataItem[]>();
  const { i18n, t } = useTranslation();
  const { dailyIntake, unit } = useUser();
  const [loading, setLoading] = useState(false);
  const [performance, setPerformance] = useState<pieDataItem[]>();
  const [averageIntake, setAverageIntake] = useState(0);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(currentTimeFrame());

  useEffect(() => {
    getData();
  }, [unit, timeFrame]);

  useEffect(() => {
    if (!intervalAmounts || !recommendedAmount) return;
    setLoading(true);
    const pie = intervalAmounts.reduce(
      (acc, curr, index) => {
        if (index === 0) return { green: 0, orange: 0, red: 0 };
        const percent = (curr.value! / recommendedAmount![index].value!) * 70;
        if (percent <= 70) {
          return { ...acc, green: acc.green + 1 };
        } else if (percent <= 85) {
          return { ...acc, orange: acc.orange + 1 };
        }
        return { ...acc, red: acc.red + 1 };
      },
      { green: 0, orange: 0, red: 0 }
    );

    setPerformance([
      {
        value: pie.green,
        color: "#9BEFB2",
        focused: true,
        text: pie.green.toString(),
      },
      { value: pie.orange, color: "#FFB76B" },
      {
        value: pie.red,
        color: "#EA3C53",
        text: `${Math.round((pie.red / recommendedAmount.length) * 100)}%`,
      },
    ]);
    setLoading(false);
  }, [intervalAmounts, recommendedAmount]);

  const getData = async () => {
    try {
      setLoading(true);

      const cleanedData = intervals.filter(
        (int) => int.leaving_weight !== null && int.fluid_amount! >= 50
      );

      const recommendedInts = cleanedData.map((int) => {
        if (unit === "imperial") {
          return {
            value:
              getDaysInInterval(
                new Date(int.start_date),
                new Date(int.end_date)
              ) * mlToOz(dailyIntake),
          };
        }
        return {
          value:
            getDaysInInterval(
              new Date(int.start_date),
              new Date(int.end_date)
            ) * dailyIntake,
          shiftPointerLabelY: 20,
        };
      });

      const cleanedIntervals: lineDataItem[] = cleanedData.map((int) => {
        const endDate = isoToFormattedDate(int.end_date, i18n.language);
        const startDate = isoToFormattedDate(int.start_date, i18n.language);
        let val = Number(int.fluid_amount);
        if (unit === "imperial") {
          val = mlToOz(int.fluid_amount!);
        }

        return { value: val, label: endDate, secondaryLabel: startDate };
      });

      if (cleanedData.length >= 1){

        const totalIntake = cleanedData.reduce((accumulator, curr) => {
          return accumulator + Number(curr.fluid_amount)
        }, 0);

        setAverageIntake(() => {
          const days = getDaysInInterval(new Date(cleanedData[0].start_date), new Date(cleanedData[cleanedData.length-1].end_date))
          if (unit === "imperial") {
            return Math.ceil(mlToOz(totalIntake)/days);
          }
          return Math.ceil(totalIntake/days)
        });
      }

      dupeFirstDataPoint(cleanedIntervals);
      dupeFirstDataPoint(recommendedInts);

      setIntervalAmounts(cleanedIntervals);
      setRecommendedAmount(recommendedInts);
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-white" refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getData()}/>}>
      {intervalAmounts && !loading && (
        <View className="mb-2">
        <GraphWrapper
          graphLabel={"hydration-tracking-graph-label"}
          dataArrLength={intervalAmounts.length}
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          tooltipContent={"hydration-tracking-info-content"}
          tooltipHeader={"hydration-tracking-info-header"}
          >
          {!(
            !intervalAmounts ||
            performance === undefined ||
            intervalAmounts.length === 0 ||
            !recommendedAmount
          ) && (
            <HydrationTrackingGraph
              recommendedAmounts={recommendedAmount}
              intervalAmounts={intervalAmounts}
              average={averageIntake}
              />
          )}
          
        </GraphWrapper>
        
        <GraphWrapper
          graphLabel={"performance-summary-label"}
          dataArrLength={intervalAmounts.length}
          tooltipContent={"performance-summary-info-content"}
          tooltipHeader={"performance-summary-info-header"}
          >
          {!(
            !intervalAmounts ||
            performance === undefined ||
            intervalAmounts.length === 0 ||
            !recommendedAmount
          ) && (
            <PerformanceSummaryChart
              intervalAmounts={intervalAmounts}
              performance={performance}
              />
          )}  
        </GraphWrapper>
      </View>
      )}
    </ScrollView>
  );
};

export default IntakeGraphs;
