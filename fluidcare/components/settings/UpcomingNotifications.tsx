import { Notifications, NotificationsFilter } from '@/utility/types';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Text } from 'react-native'
import Notification from './Notification';
import CustomDropdown from '../form/CustomDropdown';
import EmptyListComponent from '../misc/EmptyListComponent';
import { todayNotifications } from '@/utility/DemoData';

const UpcomingNotifications = () => {

  const [notifications, setNotifications] = useState<Notifications[]>(todayNotifications)
  const [filter, setFilter] = useState<NotificationsFilter>("all");
  const { t } = useTranslation();

  return (
    <ScrollView className='bg-white' contentContainerStyle={{paddingBottom: 5}} >
      <View className={"px-4 mt-3"}>
        <Text className='font-semibold text-lg '>{t("notifications-filter-header")}:</Text>
        <CustomDropdown  setValue={setFilter} data={[{label: "notifications-filter-all", value:"all"}, {label: "notifications-filter-meds", value:"meds"}, {label: "notifications-filter-refill", value:"refill"}, {label: "notifications-filter-interval", value:"interval"} ]} value={filter} />
      </View>
      {notifications?.filter((notification) => filter ==="all" || notification.type === filter).map((notification) => <Notification key={notification.notification_id} notification={notification}/>)}
      { notifications?.length === 0 && 
        <View className='mt-4'>
          <EmptyListComponent text='notifications-no-items-found'/>
        </View>
        }
    </ScrollView>
  )
}

export default UpcomingNotifications
