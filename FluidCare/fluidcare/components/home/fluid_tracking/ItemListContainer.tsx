import { Items } from "@/utility/types";
import React, {

  useState,

  forwardRef,
} from "react";
import { View } from "react-native";
import Item from "./Item";
import { todaysItems } from "@/utility/DemoData";

export type ItemListHandle = {
  refetch: () => void;
};

const ItemListContainer = forwardRef<ItemListHandle>((props, ref) => {
  const [items, setItems] = useState<Items[] | null>(todaysItems);

  return (
    <View className="flex gap-4 my-4 mx-2">
      {items!.map((item) => (
        <Item
          item={item}
          key={item.item_id}
        />
      ))}
    </View>
  );
});

export default ItemListContainer;
