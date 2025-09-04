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
  const [show, setShow] = useState(true);
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
    <View className="bg-white border rounded-lg mx-auto px-6  w-[90%] pb-4 my-6">
      <TouchableOpacity onPress={() => setShow((prev) => !prev)}>
        <MaterialIcons
          className="absolute left-0 top-5"
          name={show ? "arrow-upward" : "arrow-downward"}
          size={20}
        />
        <Text
          className={`text-center mt-4 mb-2 text-2xl font-semibold tracking-tighter`}
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
        <MaterialIcons
          className="absolute right-0 top-5"
          name={show ? "arrow-upward" : "arrow-downward"}
          size={20}
        />
      </TouchableOpacity>
      <Text className="text-center font-semibold tracking-widest">
        {formatTime(startDate, false)}
      </Text>
      {show && (
        <View className="pt-2 rounded-sm h-[8rem] overflow-hidden flex-row justify-around gap-2">
          <View className="gap-4 justify-center">
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
          <IconButton
            iconName="info"
            style="absolute -right-2"
            strokeWidth={1}
            size={20}
            onPress={() => setIsModalOpen((prev) => !prev)}
          />
          <AnimatedCircularProgress
            size={165}
            width={14}
            fill={percent}
            tintColor={getColorForPercent(percent)}
            backgroundColor="#333"
            backgroundWidth={13}
            lineCap="round"
            fillLineCap="round"
            arcSweepAngle={180}
            rotation={-90}
          >
            {(fill) => (
              <View className="pb-8 flex-row gap-2 items-center">
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
      )}
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
