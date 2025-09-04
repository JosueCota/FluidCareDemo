import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import FluidTrack from './FluidTrack';
import CustomHeader from '@/components/misc/CustomHeader';
import { View } from 'react-native';
import FaqPage from './ReadMore';
import { useTranslation } from 'react-i18next';

const HomeTabs = () => {
  const Tab = createMaterialTopTabNavigator();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{tabBarLabel:t("home-dashboard-tab")}}/>
      <Tab.Screen name="FluidTrack" component={FluidTrack} options={{tabBarLabel:t("home-fluid-track-tab")}}/>
      <Tab.Screen name="ReadMore" component={FaqPage} options={{tabBarLabel:t("home-read-more-tab")}}/>
    </Tab.Navigator>
  );
};

const Index = () => {

  return (
    <View className='flex-1 bg-white'>
        <CustomHeader style='pb-2 mb-0'/>
        <HomeTabs/>
    </View>
  )
}

export default Index
