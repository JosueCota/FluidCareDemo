import IconButton from "@/components/form/IconButton";
import NavButton from "@/components/form/NavButton";
import EmptyListComponent from "@/components/misc/EmptyListComponent";
import Loader from "@/components/misc/Loader";
import { useUser } from "@/context/UserContext";
import { currentTimeFrame } from "@/utility/data";
import { Intervals, TimeFrame } from "@/utility/types";
import {
  capitalizeFirstLetter,
  decreaseMonth,
  getFluidTag,
  increaseMonth,
  isoToFormattedDate,
  shouldDisableNextMonth,
} from "@/utility/utilityFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {intervals as mock_intervals} from "@/utility/DemoData"

const IntervalsPage = () => {
  const [intervals, setIntervals] = useState<Intervals[]>(mock_intervals);
  const { i18n, t } = useTranslation();
  const { unit } = useUser();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(currentTimeFrame());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getIntervals();
  }, [timeFrame]);

  const getIntervals = async () => {
    try {
      setRefreshing(true);

      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!intervals) return <Loader />;

  return (
    <View className="bg-white flex-1">
      <NavButton
          label="interval-page-form-btn"
          style="w-[95%] rounded-md mt-4 mb-0 py-3"
          color="bg-grey-100 border border-[#eee]"
          labelStyle="font-bold text-lg"
          href={"/(tabs)/(tracking)/IntervalForm"}
          chevronColor="grey"
        />
      <Text className="text-center text-grey-200 border-grey-200 p-4 pb-0 rounded-md">
        {t("interval-page-subtitle")}
      </Text>

      <View className="flex-row justify-between items-center px-4">
        <IconButton
          iconName="chevron-left"
          size={32}
          disabled
          onPress={() => decreaseMonth(setTimeFrame, timeFrame)}
        />
        <Text className="text-3xl font-bold text-center">
          {capitalizeFirstLetter(new Date(timeFrame.year, timeFrame.month).toLocaleDateString(
            i18n.language,
            {
              year: "numeric",
              month: "long",
            }
          ))}
        </Text>
        <IconButton
          iconName="chevron-right"
          size={32}
          onPress={() => increaseMonth(setTimeFrame, timeFrame)}
          disabled
        />
      </View>
      <FlatList
        onRefresh={getIntervals}
        refreshing={refreshing}
        data={intervals}
        keyExtractor={(item) => item.interval_id!.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.interval_id}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/(tracking)/[intervalId]",
                params: { intervalId: item.interval_id!, 
                  intervalDate: `${capitalizeFirstLetter(new Date(
                    item.start_date
                  ).toLocaleDateString(i18n.language, {
                    month: "short",
                    weekday: "short",
                    day: "2-digit",
                  }))} - ${capitalizeFirstLetter(new Date(item.end_date).toLocaleDateString(i18n.language, {
                    month: "short",
                    weekday: "short",
                    day: "2-digit",
                  }))}` },
              })
            }
            className="my-2 mx-auto bg-offwhite flex-row justify-between p-4 items-center rounded-md w-[95%]"
          >
            <Text className="text-2xl font-bold">
              {`${isoToFormattedDate(
                item.start_date,
                i18n.language
              )} - ${isoToFormattedDate(item.end_date, i18n.language)}`}{" "}
            </Text>
            <View className="flex-row gap-4 pr-2 items-center">
              <Text className="text-lg">{`${item.fluid_amount} ${getFluidTag(
                unit
              )}`}</Text>
              <MaterialIcons name="chevron-right" size={24} />
            </View>
          </TouchableOpacity>
        )}
        initialNumToRender={8}
        windowSize={10}
        ListEmptyComponent={
          <EmptyListComponent text="interval-page-none-found"/>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

export default IntervalsPage;
