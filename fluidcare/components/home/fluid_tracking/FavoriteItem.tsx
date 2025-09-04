import { getDrinkIcon } from "@/utility/data";
import { Favorite_Items, FormValues } from "@/utility/types";
import React from "react";
import { View, Text } from "react-native";
import IconButton from "../../form/IconButton";
import { getFluidTag, mlToOz } from "@/utility/utilityFunctions";
import { useUser } from "@/context/UserContext";
import { FormikErrors } from "formik";

type Props = {
  item: Favorite_Items;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<FormValues>>;
};

const FavoriteItem = ({
  item,
  setFieldValue,
}: Props) => {
  const Icon = getDrinkIcon(item.type);
  const { unit } = useUser();

  return (
    <View className="bg-offwhite p-3 rounded-md flex-row gap-2 items-center justify-between my-2">
      <View className="flex-row gap-4 items-center">
        <Icon width={24} height={24} />
        <Text
          className="text-lg font-semibold"
          style={{ flexShrink: 1, maxWidth: 75 }}
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
          style="bg-success"
          iconName="add"
          onPress={() => {}}
          disabled
          size={24}
        />
        <IconButton
          style="bg-danger"
          iconName="delete"
          disabled
          onPress={() => {}}
          size={24}
        />
      </View>
    </View>
  );
};

export default FavoriteItem;
