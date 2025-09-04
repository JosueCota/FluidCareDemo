import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/misc/CustomHeader";
import NavButton from "@/components/form/NavButton";
import { Medication_Groups, Notifications } from "@/utility/types";
import IconButton from "@/components/form/IconButton";
import { useTranslation } from "react-i18next";
import { medicationGroups, todayNotifications } from "@/utility/DemoData";

const Index = () => {

  const [medGroups, setMedGroups] = useState<Medication_Groups[]>(medicationGroups)
  const [todaysMedNotifications, setTodaysMedNotifications] = useState<Notifications[]>()
  const {i18n, t} = useTranslation();

  useEffect(() => {
    const todaysMeds = todayNotifications.filter((notifs) => notifs.type === "meds");
    setTodaysMedNotifications(todaysMeds);
  }, [])

  const changeNotificationIsFinished = async (notification_id: number, finished: boolean) => {
    try {
      setTodaysMedNotifications(prev => prev?.map(med => {
        if (med.notification_id !== notification_id) return med;
        return {...med, is_finished: finished}
      }));
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ScrollView className="bg-white">
      <CustomHeader />
      <NavButton label="create-med-group-header" 
        href={"/(tabs)/(medication)/MedicationsForm"} 
        style="w-[95%] rounded-md mt-0 mb-2 py-3"
        color="bg-grey-100 border border-[#eee]"
        labelStyle="font-bold text-lg"
      />

      <Text className="w-[95%] mx-auto text-2xl font-bold">{t("todays-notifs")}</Text>
      <View className="border-t w-[98%] mx-auto my-2 border-t-grey-150"/>
      <View>
        {todaysMedNotifications?.length !== 0  && todaysMedNotifications ? todaysMedNotifications.map((notif) => (
          <View key={notif.notification_id} className="w-[95%] mx-auto p-4 border border-[#eee] rounded-md my-2 flex-row justify-between">
            <View >  
              <Text className="font-semibold text-xl">{notif.header}</Text>
              <Text className={`${notif.is_finished? "line-through": ""}`}>{t("notif-take-meds")} {new Date(notif.date).toLocaleTimeString(i18n.language, {minute:"2-digit", hour:"2-digit", hour12:true})}</Text>
            </View>
            <IconButton iconName={notif.is_finished ? "check-box":"check-box-outline-blank" } color={notif.is_finished?"green":"black"}size={32} onPress={() => {changeNotificationIsFinished(notif.notification_id, !notif.is_finished)}}/>
          </View>
        )): 
          <View className="w-[95%] mx-auto p-4 border border-[#eee] rounded-md my-2 flex-row justify-between">
            <Text className="font-semibold text-lg">{t("notif-none-found")}</Text>
          </View>
        }
      </View>

      <Text className="w-[95%] mx-auto text-2xl font-bold">{t("med-group-header")}</Text>
      <View className="border-t w-[98%] mx-auto my-2 border-t-grey-150 mb-4"/>
      {medGroups?.map((group) => (
        <View key={group.group_id}>
          <NavButton label={group.name} 
            href={{ pathname: "/(tabs)/(medication)/[medicineGroupId]", 
            params: {
              medicineGroupId: group.group_id,
              groupName: group.name
            }}}
            style="w-[95%] rounded-md mt-0 mb-2 py-3"
            color="bg-white border border-[#eee]"
            labelStyle="font-bold text-2xl"
            iconName={group.reminder?"notifications-active": "notifications-paused"} iconSize={28}
          >
            {group.notes && <Text className="text-grey-200 mt-1" numberOfLines={2}>{group.notes}</Text>} 
          </NavButton>
        </View>
      ))}
    </ScrollView>
  );
};

export default Index;
