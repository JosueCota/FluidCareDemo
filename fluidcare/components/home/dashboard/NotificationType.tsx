import { Notifications } from '@/utility/types'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text } from 'react-native'

const NotificationType = ({notification}: {notification: Notifications}) => {
  
  const {t} = useTranslation();

  return (
    <View
    className="flex-row items-center"
    key={notification.notification_id}
    >
      <MaterialIcons name="circle" size={8} />
      <Text
        className={`my-1 mx-2 ${
          notification.is_finished ? "line-through" : ""
        }`}
        >
        {notification.type !== "interval"? notification.message: t("dashboard-notif-interval-end")}
      </Text>
    </View>
  )
}

export default NotificationType
