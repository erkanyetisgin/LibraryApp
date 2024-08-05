import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

export default function TabLayout() {
  return (

      <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{title: 'Anasayfa'}} />
        <Tabs.Screen name="books" options={{title: 'Kitaplar'}}  />
        <Tabs.Screen name="authors" options={{title: 'Yazarlar'}} />
        <Tabs.Screen name="profile" options={{title: 'Profil'}}  />
      </Tabs>

  )
}