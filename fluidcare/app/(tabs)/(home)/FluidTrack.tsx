import { ScrollView, View } from "react-native";
import React, { useRef } from "react";
import ProgressCard from "@/components/home/fluid_tracking/ProgressCard";
import { safeDate } from "@/utility/utilityFunctions";
import Loader from "@/components/misc/Loader";
import AddItemForm from "@/components/home/fluid_tracking/AddItemForm";
import ItemListContainer, {
  ItemListHandle,
} from "@/components/home/fluid_tracking/ItemListContainer";
import { todaysInterval } from "@/utility/DemoData";

const FluidTrack = () => {

  const itemListRef = useRef<ItemListHandle>(null);


  return (
    <ScrollView className="bg-white" keyboardShouldPersistTaps="handled">
      <View>
        <ProgressCard
          progress={todaysInterval?.fluid_amount || 0}
          endDate={safeDate(todaysInterval?.end_date)}
          startDate={safeDate(todaysInterval?.start_date)}
        />
        <View>
          <AddItemForm itemListRef={itemListRef} />
        </View>
        <View>
          <ItemListContainer ref={itemListRef} />
        </View>
      </View>
    </ScrollView>
  );
};

export default FluidTrack;
