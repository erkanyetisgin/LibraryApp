import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { Provider } from 'react-redux';  
import { store } from '../redux/store';  
export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="home" options={{ title: 'Anasayfa', headerShown: false }} />
        <Tabs.Screen name="books" options={{ title: 'Kitaplar', headerShown: false }} />
        <Tabs.Screen name="authors" options={{ title: 'Yazarlar', headerShown: false }} />
        <Tabs.Screen name="profile" options={{ title: 'Profil', headerShown: false }} />
      </Tabs>
    </Provider>
  );
}
