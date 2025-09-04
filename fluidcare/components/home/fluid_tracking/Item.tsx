import { getDrinkIcon } from "@/utility/data";
import { Items } from "@/utility/types";
import React, { useState } from "react";
import { View, Text } from "react-native";
import IconButton from "../../form/IconButton";
import { getFluidTag, mlToOz } from "@/utility/utilityFunctions";
import { useUser } from "@/context/UserContext";
import { useTranslation } from "react-i18next";
import ConfirmDelete from "@/components/form/ConfirmButton";

type Props = {
  item: Items;
};

const Item = ({ item }: Props) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const Icon = getDrinkIcon(item.type);
  const { unit } = useUser();

  return (
    <View className="bg-offwhite border-[#eee] border p-3 rounded-md flex-row gap-2 items-center justify-between">
      <View className="flex-row gap-4 items-center">
        <Icon width={24} height={24} />
        <Text
          className="text-lg font-semibold"
          style={{ flexShrink: 1, maxWidth: 125 }}
        >
          {item.name}
        </Text>
      </View>
      <View className="flex-row gap-4 items-center">
        <Text className="text-lg">
          {unit === "imperial" ? mlToOz(item.amount) : item.amount}{" "}
          {getFluidTag(unit)}
        </Text>
         
        <IconButton
        style="bg-grey-200"
        color="white"
        iconName="edit"
        disabled
        onPress={() => setShowModal((prev) => !prev)}
        size={24}
        />
      
        <ConfirmDelete
        btnType={"icon"}
        deleteFunction={() =>{}}
        />
      
      </View>
    </View>
  );
};

export default Item;
