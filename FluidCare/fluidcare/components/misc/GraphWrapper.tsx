import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import IconButton from "../form/IconButton";
import ModalContentWrapper from "./ModalContentWrapper";
import CustomModal from "./CustomModal";
import { useTranslation } from "react-i18next";
import { TimeFrame } from "@/utility/types";
import {
  decreaseMonth,
  increaseMonth,
  shouldDisableNextMonth,
} from "@/utility/utilityFunctions";

type Props = {
  dataArrLength: number;
  graphLabel: string;
  timeFrame?: TimeFrame;
  setTimeFrame?: (value: React.SetStateAction<TimeFrame>) => void;
  children: React.ReactNode;
  tooltipHeader?: string;
  tooltipContent?: string;
  labelStyle?: string;
};

const GraphWrapper = ({
  dataArrLength,
  graphLabel,
  timeFrame,
  setTimeFrame,
  children,
  tooltipContent,
  tooltipHeader,
  labelStyle,
  
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { i18n, t } = useTranslation();

  return (
    <View
      className={`flex mx-auto w-[95%] rounded-md content-center p-1 elevation-sm my-4 items-center ${
        (dataArrLength === 0 ) ? "opacity-80 bg-white" : "bg-white"
      }`}
    >
      <Text
        className={`mt-3 w-[75%] ${
          !labelStyle
            ? "text-2xl font-bold text-center self-center mx-auto"
            : labelStyle
        }`}
      >
        {t(graphLabel)}
      </Text>
      <IconButton
        iconName="info"
        strokeWidth={1}
        style="absolute right-4 top-3"
        size={20}
        onPress={() => setOpenModal((prev) => !prev)}
      />
      {timeFrame && setTimeFrame && (
        <View className="w-full flex-row justify-between items-center">
          <IconButton
            disabled
            iconName="chevron-left"
            size={32}
            onPress={() => decreaseMonth(setTimeFrame, timeFrame)}
          />
          <Text className="font-medium text-lg">
            {new Date(timeFrame.year, timeFrame.month)
              .toLocaleDateString(i18n.language, { month: "short" })
              .toUpperCase()}{" "}
            {timeFrame.year}
          </Text>
          <IconButton
            iconName="chevron-right"
            size={32}
            onPress={() => increaseMonth(setTimeFrame, timeFrame)}
            disabled
          />
        </View>
      )}
      <View className={`border-b w-full mb-8 ${!timeFrame && "mt-4"}`}></View>

      {(dataArrLength === 0) ? (
        <View className="h-[280px] justify-center">          
          <Text className="font-bold z-10 mb-8 bg-grey-200 text-white p-4 rounded-md  text-center">
            {t("graph-missing-data")}
          </Text>
        </View>
      ): children }

      {tooltipContent && tooltipHeader && (
        <CustomModal isOpen={openModal} setIsOpen={setOpenModal}>
          <ModalContentWrapper
            headerLabel={tooltipHeader}
            closeModal={setOpenModal}
          >
            <ScrollView className="px-3 mt-2 h-[250px]">
              <Text>{t(tooltipContent)}</Text>
            </ScrollView>
          </ModalContentWrapper>
        </CustomModal>
      )}
    </View>
  );
};

export default GraphWrapper;
