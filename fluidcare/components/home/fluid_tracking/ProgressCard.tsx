import { useUser } from "@/context/UserContext";
import {
  capitalizeFirstLetter,
  formatTime,
  getDaysInInterval,
  getFluidTag,
  mlToOz,
} from "@/utility/utilityFunctions";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Loader from "../../misc/Loader";
import { useTranslation } from "react-i18next";
import ProgressCardLegend from "./ProgressCardLegend";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../../misc/CustomModal";
import ModalContentWrapper from "../../misc/ModalContentWrapper";
import IconButton from "../../form/IconButton";
import Tooltip from "../../misc/Tooltip";

type Props = {
  progress: number;
  startDate: Date;
  endDate: Date;
};

const getTipForPercent = (p: number) => {
  if (p <= 100) return "progress-card-green";
  if (p < 115) return "progress-card-orange";
  return "progress-card-red";
};

const getColorForPercent = (p: number) => {
  if (p <= 100) return "#9BEFB2";
  if (p < 115) return "#FFB76B";
  return "#FF0000";
};

const ProgressCard = ({ progress, startDate, endDate }: Props) => {
  const { t, i18n } = useTranslation();
  const { unit, dailyIntake } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const days = getDaysInInterval(startDate, endDate);
  const [percent, setPercent] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let convertedProgress = unit === "metric" ? progress : mlToOz(progress);
    let daily = dailyIntake;
    if (unit === "imperial") {
      daily = mlToOz(dailyIntake);
    }
    const totalGoal = daily * days;
    const calculatedPercent = (convertedProgress / totalGoal) * 100;
    setPercent(calculatedPercent);
    setLoading(false);
  }, [unit, progress, days]);

  if (loading) return <Loader />;

  return (
    <View className="bg-white ">
      <View className=" pt-4 pb-4 mb-3 bg-blue-300 rounded-b-3xl ">
        <Text
          className={`text-center text-3xl font-bold tracking-tighter text-white`}
        >
          {capitalizeFirstLetter(startDate.toLocaleDateString(i18n.language, {
            month: "short",
            day: "numeric",
            weekday: "short",
          }))}{" "}
          - {""}
          {capitalizeFirstLetter(endDate.toLocaleDateString(i18n.language, {
            month: "short",
            day: "numeric",
            weekday: "short",
          }))}
        </Text>
        <Text className="text-center font-semibold tracking-widest text-xl italic text-white">
        {t("med-group-at")} {formatTime(startDate, false)}
        </Text>
      </View>
      <View className="w-[95%] p-6 pt-4 mx-auto bg-white rounded-md elevation-md mb-4 ">
        <Text className="text-2xl font-bold text-center mb-2">{t("progress-card-modal-header")}</Text>
        <IconButton
          iconName="info"
          style="absolute right-2 top-2"
          strokeWidth={1}
          size={24}
          onPress={() => setIsModalOpen((prev) => !prev)}
          />
        <View className="h-[8rem] w-full flex-row justify-around its">
          <View className="justify-around">
            <ProgressCardLegend
              label={"0-100%"}
              color="bg-success"
              tooltip={t(getTipForPercent(30))}
              />
            <ProgressCardLegend
              label={"+1-15%"}
              color="bg-[#FFB76B]"
              tooltip={t(getTipForPercent(101))}
              />
            <ProgressCardLegend
              label={">15%"}
              color="bg-danger"
              tooltip={t(getTipForPercent(120))}
              />
          </View>
          <AnimatedCircularProgress
            size={175}
            width={15}
            fill={percent}
            tintColor={getColorForPercent(percent)}
            backgroundColor="#333"
            backgroundWidth={14}
            lineCap="round"
            fillLineCap="round"
            arcSweepAngle={180}
            rotation={-90}
            >
            {(fill) => (
              <View className="pb-8 max-w-[125px] overflow-hidden flex-row gap-2 items-center">
                <Text
                  className={`text-2xl font-bold`}
                  style={{ color: getColorForPercent(percent) }}
                  >
                  {Math.round(fill)}%
                </Text>
                <Tooltip tooltipText={t("progress-card-info")}>
                  <View>
                    <Text className="text-lg font-semibold border-b text-center">
                      {unit === "metric" ? progress : mlToOz(progress)}
                      {getFluidTag(unit)}
                    </Text>
                    <Text className="text-lg font-semibold">
                      {days *
                        (unit === "imperial"
                          ? mlToOz(dailyIntake)
                          : dailyIntake)}
                      {getFluidTag(unit)}
                    </Text>
                  </View>
                </Tooltip>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
      <CustomModal setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
        <ModalContentWrapper
          headerLabel={t("progress-card-modal-header")}
          closeModal={setIsModalOpen}
          >
          <ScrollView className="px-3 mt-2 h-[250px]">
            <Text className="mb-2">{t("progress-card-modal-content-1")}</Text>
            <Text className="mb-2">{t("progress-card-modal-content-2")}</Text>
            <Text className="mb-2">{t("progress-card-modal-content-3")}</Text>
            <Text>{t("progress-card-modal-content-4")}</Text>
          </ScrollView>
        </ModalContentWrapper>
      </CustomModal>
    </View>
  );
};

export default ProgressCard;
