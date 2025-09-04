import { Notifications, NotificationsFilter } from '@/utility/types';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native'
import Loader from '../misc/Loader';
import Notification from './Notification';
import CustomDropdown from '../form/CustomDropdown';
import EmptyListComponent from '../misc/EmptyListComponent';
import { notifications as notifs } from '@/utility/DemoData';

const PreviousNotifications = () => {

  const [notifications, setNotifications] = useState<Notifications[]>(notifs)
  const flatListRef = useRef<FlatList>(null);
  const [filter, setFilter] = useState<NotificationsFilter>("all");
  
  const { i18n, t} = useTranslation();

  if (!notifications) return <Loader/>;

  return (

    <View className="bg-white h-full">
      <View className={"px-4 mt-3"}>
        <Text className='font-semibold text-lg '>{t("notifications-filter-header")}:</Text>
        
        <CustomDropdown  setValue={setFilter} data={[{label: "notifications-filter-all", value:"all"}, {label: "notifications-filter-meds", value:"meds"}, {label: "notifications-filter-refill", value:"refill"}, {label: "notifications-filter-interval", value:"interval"} ]} value={filter} />
      </View>
      <FlatList
        ref={flatListRef}
        windowSize={10}      
        initialNumToRender={10}
        keyExtractor={(item) => item.notification_id.toString()}
        data={notifications}
        ListHeaderComponent={() => (
          <Text className="mt-4 text-grey-200 px-4 text-center">
            {t("notifications-subtitle")}
          </Text>
        )}
        renderItem={({item}) => {
          if (filter !== item.type && filter !== "all") return (<></>);
          return (
            <Notification notification={item}/>
          )}}
        contentContainerStyle={{ paddingBottom: 20 }}  
        ListEmptyComponent={() => (
          <View className='mt-4'>
            <EmptyListComponent text='notifications-no-items-found'/>
          </View>
        )}
          />
    </View>
  )
}

export default PreviousNotifications
