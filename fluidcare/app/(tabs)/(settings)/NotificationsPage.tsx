import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import UpcomingNotifications from '../../../components/settings/UpcomingNotifications';
import PreviousNotifications from '../../../components/settings/PreviousNotifications';

const NotificationTabs = () => {
    const Tabs = createMaterialTopTabNavigator();
    const {t} = useTranslation();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name='UpcomingNotifications' component={UpcomingNotifications} options={{tabBarLabel:t("settings-upcoming-notifs")}}/>
            <Tabs.Screen name='PreviousNotifications' component={PreviousNotifications} options={{tabBarLabel:t("settings-prev-notifs")}}/>
        </Tabs.Navigator>
    )
}

const NotificationsPage = () => {
  return (
    <View className="flex-1">
        <NotificationTabs/>
    </View>
  )
}

export default NotificationsPage
