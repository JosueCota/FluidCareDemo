import { Items } from "@/utility/types";
import React, {
  useState,
  forwardRef,
} from "react";
import { View, Text } from "react-native";
import Item from "./Item";
import { todaysItems } from "@/utility/DemoData";
import { useTranslation } from "react-i18next";

export type ItemListHandle = {
  refetch: () => void;
};

const ItemListContainer = forwardRef<ItemListHandle>((props, ref) => {
  const [items, setItems] = useState<Items[] | null>(todaysItems);
  const {t} = useTranslation();
  
  return (
    <View className="flex gap-4 mt-4 mx-2">
       <Text className="text-2xl font-bold rounded-md px-3 pt-2 bg-white ">{t("interval-items-header")}</Text>
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
