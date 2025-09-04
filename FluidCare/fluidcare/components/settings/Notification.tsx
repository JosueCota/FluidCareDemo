import { getNotificationIcon } from '@/utility/data';
import { Notifications } from '@/utility/types';
import { isoToFormattedDate } from '@/utility/utilityFunctions';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native'


const Notification = ({notification}: {notification: Notifications}) => {
  const {i18n} = useTranslation();
  const Icon = getNotificationIcon(notification.type);
  
  return (
    <View className='border border-[#eee] w-[95%] m-auto mt-4 rounded-md p-3'>
        <View className='flex-row flex-wrap items-start gap-2'>
            <View className='items-center'>
                <Icon width={30} height={30}/>
                <Text className='text-sm italic'>{isoToFormattedDate(notification.date, i18n.language)}</Text>
            </View>
            <View className='flex-1 self-start'>
              <Text className='font-semibold'>{notification.header}</Text>
              <Text className='text-sm' numberOfLines={3}>{notification.message}</Text>
            </View>
        </View>
    </View>
  )
}

export default Notification
