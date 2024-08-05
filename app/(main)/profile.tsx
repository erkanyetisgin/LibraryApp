import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';

const profile = () => {
  const {user,setAuth}=useAuth();

  const onLogout = async() => {
      setAuth(null);
      const {error} = await supabase.auth.signOut();

      if(error){
          Alert.alert('Çıkış Yapılamadı', error.message);
      }}
return (
  <ScreenWrapper bg='white'>
    <Text>Home</Text>
    <Button title='logout' onPress={onLogout} />
  </ScreenWrapper>
)
}

export default profile

const styles = StyleSheet.create({})