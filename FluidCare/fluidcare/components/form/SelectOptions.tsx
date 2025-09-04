import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

type Props = {
    
}

const SelectOptions = () => {
  return (
    <View className="flex-row p-1 my-2 justify-around bg-offwhite mx-2 rounded-md">
        {/* <TouchableOpacity
            disabled={intervalAmounts.length === 0}
            onPress={() => setSelectedGraph("line")}
            className={`w-[48%] p-2 ${
            selectedGraph === "line" && "bg-white rounded-md"
            }`}
        >
            <Text className="text-center font-semibold">
            {t("hydration-tracking-graph-label")}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            disabled={intervalAmounts.length === 0}
            onPress={() => setSelectedGraph("pie")}
            className={`w-[48%]  p-2 ${
            selectedGraph === "pie" && "bg-white rounded-md"
            }`}
        >
            <Text className="text-center font-semibold">
            {t("performance-summary-label")}
            </Text>
        </TouchableOpacity> */}
    </View>
  )
}

export default SelectOptions
