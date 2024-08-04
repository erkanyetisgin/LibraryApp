import { View, Text, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg="lightblue">
      <Text>index</Text>
      <Button title="Hoş Geldin" onPress={() => router.push('/welcome')} /> 
    </ScreenWrapper>
  );
}

export default Index;
