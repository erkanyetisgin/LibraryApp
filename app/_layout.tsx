import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Href, Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth   } from '../contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { getUserData } from '@/services/userService'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
      
  )
}

const MainLayout = () => {
  const {setAuth,setUserData}=useAuth()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {


      if (session?.user) {
        setAuth(session?.user)
        updateUserData(session?.user)
        router.replace('profile' as unknown as Href<string | object>);
      } else {
        setAuth(null)
        router.replace('welcome' as unknown as Href<string | object>);
      }
    })
  },[])

  const updateUserData = async (user:any) => {
    let res = await getUserData(user?.id)
    if(res.success){
      setUserData(res.data)
    }

  }

  return (
    <Stack>
      <Stack.Screen name="(main)" options={{headerShown: false}} />
    </Stack>
  )
}

export default _layout