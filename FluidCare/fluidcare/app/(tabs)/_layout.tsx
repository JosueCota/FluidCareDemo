import React from 'react'
import { Tabs } from 'expo-router'
import FilledHome from "../../assets/icons/tabs/home-filled.svg"
import UnfilledHome from "../../assets/icons/tabs/home-unfilled.svg"
import FilledSettings from "../../assets/icons/tabs/settings-unfilled.svg"
import UnfilledSettings from "../../assets/icons/tabs/settings-unfilled.svg"
import FilledGraph from "../../assets/icons/tabs/graph-filled.svg"
import UnfilledGraph from "../../assets/icons/tabs/graph-unfilled.svg"
import { View } from 'react-native'
import FilledPill from "../../assets/icons/tabs/pill-filled.svg"
import UnfilledPill from "../../assets/icons/tabs/pill-unfilled.svg"
import { useTranslation } from 'react-i18next'



const TabLayout = () => {

  const { t } = useTranslation();

  return (
      <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor:"#48E0FB",
            tabBarInactiveBackgroundColor: "#fff",
            tabBarIconStyle: {margin:"auto"},
            tabBarStyle: {
              height: 60,
            },
            animation:"none",
            tabBarHideOnKeyboard:true,
             
          }}
          
          >
          <Tabs.Screen 
          name='(home)'
          options={{
            tabBarIcon: ({focused}) =>  (<View className={`${focused && ""}`}>{ focused?<FilledHome  width={40} height={40} color={"white"}/>: <UnfilledHome width={42} height={42}/>}</View>),
            headerShown: false,
            tabBarActiveBackgroundColor: "#48E0FB"
          }}
          
          />
          <Tabs.Screen 
          name='(medication)'
          options={{
            tabBarIcon: ({focused}) => focused? <FilledPill  width={34} height={34} color={"white"} />: <UnfilledPill width={34} height={34} color={"black"}/>,
            headerShown: false
          }}
          />
          <Tabs.Screen 
          name='(tracking)'
          options={{
            tabBarIcon: ({focused}) => focused? <FilledGraph width={48} height={38} color={"white"}/>: <UnfilledGraph width={48} height={38} color={"black"}/>,
            headerShown: false
          }}
          />
          <Tabs.Screen 
          name='(settings)'
          options={{
            tabBarIcon: ({focused}) => focused? <FilledSettings  width={48} height={38} color={"white"}/>: <UnfilledSettings width={48} height={38} color={"black"}/>,
            headerShown: false
          }}
          />
      </Tabs>
  )
}

export default TabLayout