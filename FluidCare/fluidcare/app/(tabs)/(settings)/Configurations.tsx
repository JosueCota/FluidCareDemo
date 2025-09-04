import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileConfig from '../../../components/settings/ProfileConfig';
import OtherConfig from '../../../components/settings/OtherConfig';
import { View } from 'react-native';
import SystemPreferences from '../../../components/settings/SystemPreferences';
import { useTranslation } from 'react-i18next';

const ConfigurationTabs = () => {
    const Tabs = createMaterialTopTabNavigator();
    const {t} = useTranslation();

    return (
        <Tabs.Navigator>
            <Tabs.Screen name='ProfileConfig' component={ProfileConfig} options={{tabBarLabel:t("settings-user-label")}}/>
            <Tabs.Screen name='OtherConfig' component={OtherConfig} options={{tabBarLabel:t("settings-other-label")}}/>
            <Tabs.Screen name='SystemPreferences' component={SystemPreferences} options={{tabBarLabel:t("settings-pref-label")}}/>
        </Tabs.Navigator>
    )
}

const Configurations = () => {
  return (
    <View className="flex-1">
        <ConfigurationTabs/>
    </View>
  )
}

export default Configurations
