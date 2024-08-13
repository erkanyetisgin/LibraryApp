import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';
import ScreenWrapper from '@/components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { Href, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import { hp, wp } from '@/helpers/common';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

const Login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false);
    

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Giriş Yapılamadı', 'Lütfen tüm alanları doldurunuz');
            return;
        }
    
        let email = emailRef.current.trim();
        let password = passwordRef.current.trim();
    
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
    
        setLoading(false);
    
        if (error) {
            Alert.alert('Giriş Yapılamadı', error.message);
        } else {
            if (email === 'admin@mail.com') {
                console.log('admin');
                router.replace('(admin)/admin' as unknown as Href<string | object>);
            } else {
                router.replace('(tabs)/home' as unknown as Href<string | object>);
            }
        }
    }
    

    return (
        <ScreenWrapper bg='white'>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <BackButton router={router} />
                <View>
                    <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
                </View>
                <View style={styles.form}>
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Devam etmek için giriş yapın
                    </Text>
                    <Input
                        icon={<Icon name='mail' size={26} strokeWidth={1.6} colors={theme.colors.text} />} 
                        placeholder='E-mail'
                        onChangeText={value => emailRef.current = value}
                    />
                    <Input
                        icon={<Icon name='password' size={26} strokeWidth={1.6} colors={theme.colors.text} />} 
                        placeholder='Şifre'
                        secureTextEntry
                        onChangeText={value => passwordRef.current = value}
                    />

                    <Button title='Giriş Yap' onPress={onSubmit} loading={loading} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}> Hesabın yok mu ?</Text>
                    <Pressable onPress={()=>router.push('/signUp')}>
                        <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: '600' }]}>Kayıt Ol</Text>
                    </Pressable>
                    </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    welcomeText: {
        fontSize: hp(4),
        fontWeight: '700',
        color: theme.colors.text,
    },
    form: {
        gap: 25,
    },
    forgot: {
        color: theme.colors.text,
        fontSize: hp(1.7),
        textAlign: 'center',
        paddingHorizontal: wp(10),
    },
    footer: {
        gap: 30,
        width: '100%',
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(2),
        fontWeight: '600',
    },
});
