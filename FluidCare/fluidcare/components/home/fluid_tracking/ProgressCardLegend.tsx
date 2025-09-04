import React from "react";
import { View, Text } from "react-native";
import Tooltip from "../../misc/Tooltip";

type Props = {
  color: string;
  label: string;
  tooltip: string;
};

const ProgressCardLegend = ({ label, tooltip, color }: Props) => {
  return (
    <Tooltip tooltipText={tooltip} right={true}>
      <View className="flex-row gap-2">
        <View className={`${color} h-[16px] w-[16px] rounded-sm`}></View>
        <Text className="font-semibold">{label}</Text>
      </View>
    </Tooltip>
  );
};

export default ProgressCardLegend;
