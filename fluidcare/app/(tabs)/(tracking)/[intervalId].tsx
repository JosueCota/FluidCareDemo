import CustomButton from "@/components/form/CustomButton";
import CustomTextInput from "@/components/form/CustomTextInput";
import ValidationError from "@/components/form/ValidationError";
import ConfirmDelete from "@/components/form/ConfirmButton";
import Loader from "@/components/misc/Loader";
import { useUser } from "@/context/UserContext";
import { Intervals, Items } from "@/utility/types";
import {
  getDaysInInterval,
  getFluidTag,
  getWeightTag,
  showToast,
} from "@/utility/utilityFunctions";
import { UpdateIntervalSchema } from "@/utility/yupSchemas";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView } from "react-native";
import DropletSVG from "@/assets/icons/tabs/droplet-filled.svg"
import TargetSVG from "@/assets/icons/intervals/target.svg"
import WetWeightSVG from "@/assets/icons/intervals/wet-weight.svg"
import LeavingWeightSVG from "@/assets/icons/intervals/leaving-weight.svg"
import Item from "@/components/home/fluid_tracking/Item";
import EmptyListComponent from "@/components/misc/EmptyListComponent";
import { intervals, items as allItems } from "@/utility/DemoData";

const Interval = () => {
  const { unit, dailyIntake } = useUser();
  const { intervalId } = useLocalSearchParams();
  const [interval, setInterval] = useState<Intervals>();
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState<Items[]>();

  useEffect(() => {
    const int = intervals.find((i) => i.interval_id === Number(intervalId));
    setInterval(int);

    const items = allItems.filter((item) => item.interval_id === Number(intervalId));
    setItems(items);
  }, [unit]);

  const handleSubmit = async () => {
    showToast(
      "success",
      t("toast-updated"),
      t("updated-interval-toast-subtitle"),
      1500
    );
    setEditing(false);
  };

  const handleDelete = async () => {
    router.back();
  };

  if (!interval) return <Loader />;

  return (
    <ScrollView className="bg-white h-full" contentContainerStyle={{paddingBottom:6}}>
      <View className="w-[95%] mx-auto mt-6">
          {!editing ? (
            <View>
              <View className="flex-row gap-4 self-center m2-4">
                <CustomButton
                  label="btn-edit"
                  onPress={() => setEditing(true)}
                  style="bg-white border py-2"
                />
                <ConfirmDelete
                  btnType={"button"}
                  btnStyle="mt-0 py-2 border bg-white"
                  deleteFunction={() => handleDelete()}
                />
              </View>
              <Text className="text-2xl font-bold mb-2  rounded-md p-3 bg-white">{t("interval-fluid-header")}</Text>
              <View className="grid grid-cols-2 gap-3 mb-2 w-[95%] mx-auto">
                <View className="border border-[#eee] bg-white p-4 rounded-md">
                  <View className="flex-row justify-between">
                    <Text className="text-md font-semibold">{t("interval-total-label")}</Text>
                    <DropletSVG width={24} height={24} color={"#48e0fb"} />
                  </View>
                  <Text className="text-lg text-end">
                    {interval.fluid_amount} {getFluidTag(unit)}s
                  </Text>
                </View>

                <View className="border border-[#eee] bg-white p-4 rounded-md">
                  <View className="flex-row justify-between">
                    <Text className="text-md font-semibold">{t("interval-rec-label")}</Text>
                    <TargetSVG width={24} height={24} />
                  </View>
                  <Text className="text-lg">
                    {getDaysInInterval(new Date(interval.start_date), new Date(interval.end_date)) *
                      dailyIntake}{" "}
                    {getFluidTag(unit)}s
                  </Text>
                </View>
              </View>

              <Text className="text-2xl font-bold mb-2  rounded-md p-3 bg-white ">{t("interval-weight-header")}</Text>
               <View className="grid grid-cols-2 gap-3 mb-2 w-[95%] mx-auto">
                <View className="border border-[#eee] bg-white p-4 rounded-md">
                  <View className="flex-row justify-between">
                    <Text className="text-md font-semibold">{t("finalize-interval-arrival-label")}</Text>
                    <WetWeightSVG width={24} height={24} color={"#48e0fb"} />
                  </View>
                  <Text className="text-lg text-end">
                    {interval.arrival_weight}{" "}
                    {getWeightTag(unit)}s
                  </Text>
                </View>

                <View className="border border-[#eee] bg-white p-4 rounded-md">
                  <View className="flex-row justify-between">
                    <Text className="text-md font-semibold">{t("finalize-interval-leaving-label")}</Text>
                    <LeavingWeightSVG width={24} height={24} />
                  </View>
                  <Text className="text-lg">
                    {interval.leaving_weight}{" "}
                    {getWeightTag(unit)}s
                  </Text>
                </View>
              </View>
                      
              <Text className="text-2xl font-bold  rounded-md px-3 py-2 bg-white ">{t("interval-items-header")}</Text>
               <Text className="text-grey-200 text-center mx-4 mb-2">{t("interval-items-note")}</Text>
               <View className="grid grid-cols-2 gap-3 mb-2 w-[95%] mx-auto">
                {items?.length === 0 && <EmptyListComponent text="interval-items-none"/>}
                  {items?.map((item => 
                    <Item item={item} key={item.item_id}/>
                  ))}
              </View>

            </View>
          ) : (
            <Formik
              initialValues={{
                arrivalWeight: interval.arrival_weight,
                leavingWeight: interval.leaving_weight,
                totalFluid: interval.fluid_amount,
              }}
              onSubmit={() => handleSubmit()}
              validationSchema={UpdateIntervalSchema}
            >
              {({ handleSubmit, values, touched, errors, handleChange }) => (
                <View className="bg-white p-3 rounded-md border border-[#eee]">
                  <CustomTextInput
                    id="totalFluid"
                    unit={getFluidTag(unit)}
                    label="interval-total-label"
                    onChange={handleChange("totalFluid")}
                    value={values.totalFluid}
                    keyboardType="number-pad"
                    unitStyle="border-b-grey-200 border-b"
                    style="border-b-grey-200 border-b border-b-solid"
                  />
                  <ValidationError
                    touched={touched.totalFluid}
                    error={errors.totalFluid}
                  />
                  <CustomTextInput
                    id="totalFluid"
                    unit={getWeightTag(unit)}
                    tooltip="finalize-interval-arrival-tip"
                    label="finalize-interval-arrival-label"
                    onChange={handleChange("arrivalWeight")}
                    style="border-b-grey-200 border-b border-b-solid"
                    value={values.arrivalWeight}
                    keyboardType="number-pad"
                    unitStyle="border-b-grey-200 border-b"
                  />
                  <ValidationError
                    touched={touched.arrivalWeight}
                    error={errors.arrivalWeight}
                  />
                  <CustomTextInput
                    id="totalFluid"
                    unit={getWeightTag(unit)}
                    tooltip="finalize-interval-leaving-tip"
                    label="finalize-interval-leaving-label"
                    onChange={handleChange("leavingWeight")}
                    style="border-b-grey-200 border-b border-b-solid"
                    value={values.leavingWeight}
                    keyboardType="number-pad"
                    unitStyle="border-b-grey-200 border-b"
                  />
                  <ValidationError
                    touched={touched.leavingWeight}
                    error={errors.leavingWeight}
                  />
                  <View className="flex-row gap-4  self-center mb-2 mt-2">
                    <CustomButton
                      label="btn-cancel"
                      style="bg-white border py-2"
                      onPress={() => setEditing(false)}
                    />
                    <CustomButton
                      label="btn-confirm"
                      style="bg-white border py-2 "
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          )}
      </View>
      
    </ScrollView>
  );
};

export default Interval;
