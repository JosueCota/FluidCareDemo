import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

type Props = {
  style?: string
};

const CustomHeader = ({ style }: Props) => {
  const { theme, setTheme, unit, setUnit } = useUser();

  const changeUnits = () => {
    const u = unit === "metric" ? "imperial" : "metric";
    setUnit(u);
    AsyncStorage.setItem("unit", u);
  };


  return (
    <View className={`px-5 pt-4 flex-row justify-between items-center ${style? style: "pb-6"}`}>
      <Link href={"/(tabs)/(home)/"} asChild>
        <TouchableOpacity activeOpacity={.8} className="flex-row bg-blue-300 px-3 py-2 rounded-md w-[40%] justify-center gap-1">
          <Text className="text-xl font-bold tracking-[2px] text-blue-100">
            Fluid
          </Text>
          <Text className="text-xl font-bold tracking-[2px] text-success">
            Care
          </Text>
        </TouchableOpacity>
      </Link>
      
      <View className="flex-row gap-2 items-center">
        <TouchableOpacity
          className="p-2 bg-grey-300 rounded-md"
          onPress={changeUnits}
        >
          <Text className="text-white text-sm py-1 w-[60px] text-center font-semibold">
            {unit === "imperial"? "OZ/LB": "ML/KG"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
