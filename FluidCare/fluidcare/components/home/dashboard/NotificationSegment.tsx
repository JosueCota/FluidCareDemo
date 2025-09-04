import { Notifications, NotificationTypes } from '@/utility/types'
import React from 'react'
import { View, Text } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import NotificationType from './NotificationType'
type Props = {
    notifications: Notifications[],
    type: NotificationTypes,
    HeaderIcon: React.FC<SvgProps>,
    iconSize: number,
    header: string,
}

const NotificationSegment = ({notifications, type, HeaderIcon, iconSize, header}: Props) => {
  
  const {t} = useTranslation();
  
  const filteredNotifs = notifications.filter(item => item.type === type);

  if (filteredNotifs.length === 0) return;

  return (
    <View className="mb-2">
          <View className="flex-row gap-2 items-center">
            <HeaderIcon width={iconSize} height={iconSize}/>
            <Text className="text-lg font-medium mb-1">
              {t(header)}
            </Text>
          </View>
          {filteredNotifs
            .map((item) => (
              <NotificationType key={item.notification_id} notification={item}/>
            ))}
        </View>
  )
}

export default NotificationSegment
