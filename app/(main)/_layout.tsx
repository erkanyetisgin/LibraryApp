import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

export default function TabLayout() {
  return (

      <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen name="home" options={{title: 'Anasayfa', headerShown: false}} />
        <Tabs.Screen name="books" options={{title: 'Kitaplar', headerShown: false}} />
        <Tabs.Screen name="authors" options={{title: 'Yazarlar', headerShown: false}} />
        <Tabs.Screen name="profile" options={{title: 'Profil', headerShown: false}} />
      </Tabs>

  )
}