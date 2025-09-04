import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import MedicationSVG from "@/assets/icons/tabs/medication.svg";
import IntervalSVG from "@/assets/icons/notifs/interval.svg";
import RefillSVG from "@/assets/icons/notifs/refill-alert.svg";
import MedsSVG from "@/assets/icons/notifs/meds.svg"
import TrackingSVG from "@/assets/icons/tabs/tracking.svg";
import { showToast } from "@/utility/utilityFunctions";
import Section from "@/components/home/dashboard/SectionContainer";
import NotificationSegment from "@/components/home/dashboard/NotificationSegment";
import { useTranslation } from "react-i18next";
import { todayNotifications, user } from "@/utility/DemoData";

const images = {
  medication: require("@/assets/images/Meds.png"),
  tracking: require("@/assets/images/Tracking.png")
}

const HomeScreen = () => {

  const [refreshing, setRefreshing] = useState(false);

  const {t} = useTranslation();

  const initializeHome = async() => {
    try {
      setRefreshing(true)
      setRefreshing(false)

    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
  
      const [header, ...rest] = errorMessage.split('\n');
      const body = rest.join('\n').trim();

      showToast("error", header, body, 4000 )
    }
  }

  return (
    <ScrollView className="flex-1 bg-white px-3"
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={initializeHome}/>
    }>

      <Text numberOfLines={1} className="pt-2 font-bold text-3xl">{t("dashboard-hello")} {user.name}!</Text>
      <Text className="mb-3 text-grey-200">{t("dashboard-subtitle")}</Text>

      <Section header="dashboard-notif-header" headerIconName={"notifications"} subtitle="dashboard-notif-subtitle" buttonLabel="dashboard-notif-button-label" href={"/(tabs)/(settings)/"} iconSize={24} >
        {(todayNotifications && todayNotifications?.length !== 0)?
          <>
            <NotificationSegment notifications={todayNotifications} type={"meds"} HeaderIcon={MedsSVG} iconSize={16} header={"dashboard-notif-meds-label"} />
            <NotificationSegment notifications={todayNotifications} type={"interval"} HeaderIcon={IntervalSVG} iconSize={18} header={"dashboard-notif-interval-label"} />
            <NotificationSegment notifications={todayNotifications} type={"refill"} HeaderIcon={RefillSVG} iconSize={16} header={"dashboard-notif-refill-label"} />
          </>: 
          <View>
              <Text className="font-bold">{t("dashboard-notif-empty-error")}</Text>
          </View>
        }  
      </Section>

      <Section header="dashboard-meds-header" HeaderIcon={MedicationSVG} subtitle="dashboard-meds-subtitle" buttonLabel="dashboard-meds-button-label"  iconSize={38} translate={{x:-4, y:-2}} style="gap-0" imageSource={images.medication} imageResizeMode="stretch" imageStyle='h-[200px] w-[95%] mx-auto bg-blue-200 rounded-md' href={"/(tabs)/(medication)/"}/>
      
      <Section header="dashboard-tracking-header" HeaderIcon={TrackingSVG} subtitle={"dashboard-tracking-subtitle"} buttonLabel="dashboard-tracking-button-label" iconSize={30} iconStrokeWidth={3} imageSource={images.tracking}  imageStyle='h-[200px] w-[95%] mx-auto bg-blue-200 rounded-md' href={"/(tabs)/(tracking)/"}/>
    </ScrollView>
  );
};

export default HomeScreen;
