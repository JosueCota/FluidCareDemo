import { RefreshControl, ScrollView, View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/misc/CustomHeader";
import NavButton from "@/components/form/NavButton";
import { Intervals } from "@/utility/types";
import { CurveType, LineChart, lineDataItem } from "react-native-gifted-charts";
import {
  dupeFirstDataPoint,
  getDaysInInterval,
  isoToFormattedDate,
  mlToOz,
} from "@/utility/utilityFunctions";
import { useUser } from "@/context/UserContext";
import { useTranslation } from "react-i18next";
import Loader from "@/components/misc/Loader";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { TrackingSlides1, TrackingSlides2, TrackingSlides3 } from "@/components/tracking/TrackingSlides";
import { intervals } from "@/utility/DemoData";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [averageIntake, setAverageIntake] = useState(0);
  const [averageSentiment, setAverageSentiment] = useState(0);

  const { unit, dailyIntake } = useUser();
  const { i18n, t } = useTranslation();
  const ref = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const progress = useSharedValue<number>(0);

  const [hydrationGraphData, setHydrationGraphData] =
    useState<lineDataItem[]>();
  const [recommendedMaxIntakeGraphData, setRecommendedMaxIntakeGraphData] =
    useState<lineDataItem[]>();
  const [wetWeightGraphData, setWetWeightGraphData] =
    useState<lineDataItem[]>();
  const [afterDialysisWeightGraphData, setAfterDialysisWeightGraphData] =
    useState<lineDataItem[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setRefreshing(true);

      const cleanedData = intervals.filter(
        (int) => int.leaving_weight !== null && int.fluid_amount! >= 50
      );

      if (cleanedData.length >= 1){
        const totalIntake = cleanedData.reduce((accumulator, curr) => {
          return accumulator + Number(curr.fluid_amount)
        }, 0);

        const totalSentiment = cleanedData.reduce((accumulator, curr) => {
          return accumulator + Number(curr.sentiment);
        }, 0)

        setAverageIntake(() => {
          const days = getDaysInInterval(new Date(cleanedData[0].start_date), new Date(cleanedData[cleanedData.length-1].end_date))
          if (unit === "imperial") {
            return Math.ceil(mlToOz(totalIntake)/days);
          }
          return Math.ceil(totalIntake/days)
        })

        setAverageSentiment(() => {
          return Number((totalSentiment/cleanedData.length).toFixed(2))
        })
      }

      setFluidIntakeGraphData(cleanedData);
      setWeightGraphData(cleanedData);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  const setFluidIntakeGraphData = (intervals: Intervals[]) => {
    const cleanedData = intervals.filter(
      (int) => int.leaving_weight !== null && int.fluid_amount! >= 50
    );

    const recommendedInts = cleanedData.map((int) => {
      return {
        value:
          getDaysInInterval(new Date(int.start_date), new Date(int.end_date)) *
          dailyIntake,
        shiftPointerLabelY: 20,
      };
    });

    const cleanedIntervals: lineDataItem[] = cleanedData.map((int) => {
      const endDate = isoToFormattedDate(int.end_date, i18n.language);
      const startDate = isoToFormattedDate(int.start_date, i18n.language);
      let val = Number(int.fluid_amount);
      return { value: val, label: endDate, secondaryLabel: startDate };
    });

    dupeFirstDataPoint(recommendedInts);
    dupeFirstDataPoint(cleanedIntervals);

    setHydrationGraphData(cleanedIntervals);
    setRecommendedMaxIntakeGraphData(recommendedInts);
  };

  const setWeightGraphData = async (intervals: Intervals[]) => {
    const cleanedData = intervals.filter(
      (int) => int.leaving_weight !== null || int.arrival_weight !== null
    );

    const leavingAmounts = cleanedData.map((interval) => {
      let val = Number(interval.leaving_weight) ?? 0;
      return { value: val };
    });

    const arrivalAmounts = cleanedData.map((interval) => {
      const endDate = isoToFormattedDate(interval.end_date, i18n.language);
      const startDate = isoToFormattedDate(interval.start_date, i18n.language);
      let val = Number(interval.arrival_weight) ?? 0;
      return { value: val, label: endDate, secondaryLabel: startDate };
    });

    if (arrivalAmounts.length === 0) {
      setWetWeightGraphData([]);
      setAfterDialysisWeightGraphData([]);
      return;
    }

    dupeFirstDataPoint(leavingAmounts);
    dupeFirstDataPoint(arrivalAmounts);

    setAfterDialysisWeightGraphData(leavingAmounts);
    setWetWeightGraphData(arrivalAmounts);
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const data = [
    <TrackingSlides1/>,
    <TrackingSlides2 averageIntake={averageIntake}/>,
    <TrackingSlides3 averageSentiment={averageSentiment}/>,
  ]
  
  return (
    <ScrollView
      className="flex-1 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => getData()} />
      }
    >
      <CustomHeader />
      
      <View>
        <NavButton
          label="tracking-screen-int-rec"
          href={"/(tabs)/(tracking)/IntervalsPage"}
          style="w-[95%] rounded-md mt-0 py-3"
          labelStyle="font-bold text-lg"
          color="bg-grey-100 border border-[#eee]"
          chevronColor="grey"
        />
        <NavButton
          label="tracking-screen-weight-records"
          href={"/(tabs)/(tracking)/DryWeightsPage"}
          style="w-[95%] rounded-md mt-1 py-3"
          labelStyle="font-bold text-lg"
          color="bg-grey-100 border border-[#eee]"
          chevronColor="grey"
        />

        <Text className="w-[95%] mx-auto text-2xl font-bold">{t("tracking-header")}</Text>
        <View className="border-t w-[98%] mx-auto my-2 border-t-grey-150 mb-4"/>
        
        <View className="mb-4">
          <Carousel
            ref={ref}
            autoPlayInterval={5000}
            autoPlay
            loop
            width={width}
            height={width / 1.6}
            data={data}
            onProgressChange={progress}
            renderItem={({ index }) => (
              <View className="w-[95%] bg-white border-[#eee] border h-[215px] mx-auto content-center p-4 rounded-md">
                {data[index]}
              </View>
            )}
            />
          <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 5 }}
          onPress={onPressPagination}
          />
        </View>
        <View className="p-4 pb-1 w-[95%] border border-[#eee] bg-white mb-4 mx-auto rounded-md">
          <View className="flex-row justify-between">
            <View className="w-[65%]">
              <Text className="mb-4 text-xl font-bold">{t("tracking-screen-hydration-track")}</Text>
              <Text className="text-md">
                {t("tracking-hydration-track-subtitle")}
              </Text>
            </View>
            {!refreshing ? (
              <View className="mx-auto rounded-md ">
                <LineChart
                  data={recommendedMaxIntakeGraphData}
                  data2={hydrationGraphData}
                  height={65}
                  width={65}
                  color1="green"
                  color2="#7BAFFD"
                  areaChart1
                  areaChart2
                  startFillColor1="#9BEFB2"
                  startFillColor2="rgb(46, 217, 255)"
                  endFillColor2="rgb(203, 241, 250)"
                  endFillColor1="#fff"
                  hideYAxisText
                  hideRules
                  disableScroll
                  initialSpacing={0}
                  spacing1={16}
                  spacing2={16}
                  curved
                  curveType={CurveType.QUADRATIC}
                  dataPointsRadius1={0}
                  yAxisColor={"#ddd"}
                  xAxisColor={"#ddd"}
                  adjustToWidth
                  xAxisLength={65}
                  dataPointsRadius2={0}
                  yAxisOffset={1000}
                  yAxisExtraHeight={5}
                  xAxisLabelsHeight={0}
                />
              </View>
            ) : (
              <Loader />
            )}
          </View>
          
          <NavButton
            label={"tracking-view-graph-btn"}
            style="my-0 rounded-full pt-3 pb-3 pl-6 w-full justify-between"
            color="bg-blue-200"
            labelStyle="text-black font-bold text-lg"
            href={"/(tabs)/(tracking)/IntakeGraphs"}
          />
        </View>
        <View className="p-4 pb-1 w-[95%] border border-[#eee] bg-white mx-auto mb-4 rounded-md">
          <View className="flex-row justify-between">
            <View className="w-[65%]">
              <Text className="mb-4 text-xl font-bold">{t("tracking-screen-weight-track")}</Text>
              <Text className="text-md">
                {t("tracking-weight-track-subtitle")}
              </Text>
            </View>
            {!refreshing ? (
              <View className="rounded-md mx-auto">
                <LineChart
                  data={wetWeightGraphData}
                  data2={afterDialysisWeightGraphData}
                  height={65}
                  width={65}
                  color1="#7BAFFD"
                  color2="#BF0000"
                  areaChart1
                  areaChart2
                  startFillColor1="#48E0FB"
                  startFillColor2="#F69595"
                  endFillColor1="#fff"
                  endFillColor2="#fff"
                  hideYAxisText
                  hideRules
                  disableScroll
                  initialSpacing={0}
                  dataPointsRadius1={0}
                  dataPointsRadius2={0}
                  spacing1={16}
                  spacing2={16}
                  curved
                  curveType={CurveType.QUADRATIC}
                  yAxisColor={"#ddd"}
                  xAxisColor={"#ddd"}
                  parentWidth={65}
                  xAxisLength={65}
                  adjustToWidth
                  yAxisOffset={50}
                  yAxisExtraHeight={5}
                  xAxisLabelsHeight={0}
                />
              </View>
            ) : (
              <Loader />
            )}
          </View>
          <NavButton
            label={"tracking-view-graph-btn"}
            style="my-0 rounded-full pt-3 pb-3 pl-6 w-full justify-between"
            color="bg-blue-200"
            labelStyle="text-black font-bold text-lg"
            href={"/(tabs)/(tracking)/WeightGraphs"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
