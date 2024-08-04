import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp,hp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {
  const router = useRouter()
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <Image style= {styles.welcomeImage} resizeMode='contain'source={require('../assets/images/welcome.png')} /> 

        <View style={{gap: 20}}>
          <Text style={styles.title}>Hoş Geldin !</Text>
          <Text style={styles.punchline}>Uygulamamıza hoş geldiniz</Text>

        </View>
        <View style={styles.footer}>
          <Button 
          title='Giriş Yap'
          buttonStyle={{marginHorizontal: wp(3)}}
          onPress={() => router.push('/login')}
          />
          <View style={styles.bottomTextContainer}>
          <Text style={styles.loginText}>
              Hesabın yok mu ?
            </Text>
            <Pressable onPress={()=>router.push('/signUp')}>
              <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: '600'}]}>
                Kayıt Ol
              </Text>
            </Pressable>
            </View>
        </View>
      </View>

    </ScreenWrapper>
  )
} 

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: wp(4)
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: '800'
  },
  punchline: {
    color: theme.colors.text,
    fontSize: hp(1.7),
    textAlign: 'center',
    paddingHorizontal: wp(10),

  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(2),
    fontWeight: '600',
  }

})