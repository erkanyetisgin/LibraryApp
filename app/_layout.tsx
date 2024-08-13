import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Href, Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/services/userService';
import { store } from './redux/store';

const _layout = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuth(session?.user);
        updateUserData(session?.user);

        if (session?.user.email === 'admin@mail.com') {
          router.replace('(admin)/admin' as unknown as Href<string | object>);
        } else {
          router.replace('(tabs)/home' as unknown as Href<string | object>);
        }
      } else {
        setAuth(null);
        router.replace('welcome' as unknown as Href<string | object>);
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    let res = await getUserData(user?.id);
    if (res.success) {
      setUserData(res.data);
    }
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)/admin" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default _layout;
