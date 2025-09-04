import CustomButton from "@/components/form/CustomButton";
import ConfirmDelete from "@/components/form/ConfirmButton";
import DryWeight from "@/components/settings/DryWeight";
import { Dry_Weight } from "@/utility/types";
import { isoToFormattedDate } from "@/utility/utilityFunctions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, FlatList } from "react-native";
import EmptyListComponent from "@/components/misc/EmptyListComponent";
import { dryWeights as DryWeights } from "@/utility/DemoData";

const DryWeightsPage = () => {
  const [dryWeights, setDryWeights] = useState<Dry_Weight[]>(DryWeights);
  const [editting, setEditing] = useState(false);
  const { t, i18n } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (dryWeightId: number) => {
    try {
      setDryWeights((prev) => {
        return prev?.filter((item) => {
          return item.dry_weight_id !== dryWeightId;
        });
      });
    } catch (err) {
      console.log(err);
    } 
  };

  return (
    <View className="bg-white flex-1">
      {!editting ? (
        <CustomButton
          onPress={() => setEditing(true)}
          label="dry-weight-add-btn"
          style="border border-[#eee] bg-grey-100 w-[95%] my-4 py-2"
        />
      ) : (
        <View className="bg-grey-100 w-[95%] mx-auto border my-4 p-3 border-[#eee] rounded-md">
          <DryWeight setEditing={setEditing} loadData={loadData} />
        </View>
      )}
      <Text className="w-[95%] mx-auto text-2xl font-bold">{t("dry-weight-records")}</Text>
      <FlatList
        onRefresh={loadData}
        refreshing={refreshing}
        data={dryWeights}
        keyExtractor={(item) => item.dry_weight_id!.toString()}
        renderItem={({ item }) => (
          <View
            key={item.dry_weight_id}
            className="my-2 mx-auto bg-offwhite flex-row justify-between p-2 px-4 items-center rounded-md w-[95%]"
          >
            <Text className="text-xl font-semibold">
              {t("dry-weight-label")}: {item.weight}
            </Text>
            <View className="flex-row gap-5 justify-center items-center">
              <Text className="text-xl italic">
                {isoToFormattedDate(item.date!, i18n.language)}
              </Text>
              <ConfirmDelete
                btnType={"icon"}
                deleteFunction={() => handleDelete(item.dry_weight_id!)}
              />
            </View>
          </View>
        )}
        initialNumToRender={8}
        windowSize={10}
        ListEmptyComponent={
          <EmptyListComponent text="no-data-found"/>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      ></FlatList>
    </View>
  );
};

export default DryWeightsPage;
