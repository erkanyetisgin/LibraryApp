import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import Icon from '@/assets/icons';
import * as ImagePicker from 'expo-image-picker';
import { uploadFile } from '@/services/imageService';

const Profile = () => {
  const { user, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  function setSearchQuery(query: string): void {
    throw new Error('Function not implemented.');
  }

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Çıkış Yapılamadı', error.message);
    }
  };

  const editImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);
        const { uri } = result.assets[0];
        const folderName = 'images';
        const { success, data, msg } = await uploadFile(folderName, uri, true);

        if (success) {
          const imageUrl = data;
          const { error } = await supabase
            .from('users')
            .update({ image: imageUrl })
            .eq('id', user.id);

          if (error) {
            Alert.alert('Hata', 'Resim URL\'si kullanıcı bilgilerine kaydedilemedi.');
          } else {
            Alert.alert('Başarı', 'Resim başarıyla yüklendi ve kaydedildi.');
            user.image = imageUrl; 
          }
        } else {
          Alert.alert('Hata', msg || 'Resim yüklenirken bir hata oluştu.');
        }
        
        setLoading(false);
      }
    } catch (error) {
      console.error('Resim seçme veya yükleme hatası:', error);
      Alert.alert('Hata', 'Bir hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <View>
      <Header title="Profil" setSearchQuery={setSearchQuery} showSearch={false} showFilter={false} showSort={false} />
      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar uri={user?.image} size={100} rounded={500} style={{ alignSelf: 'center', marginVertical: 20 }} />
            <Pressable style={styles.editIcon} onPress={editImage}>
              <Icon name='edit' size={24} colors='#000' />
            </Pressable>
          </View>

          <View style={{ alignItems: 'center', gap: 4 }}>
            <Text style={styles.userName}> {user.name}</Text>
            <Text style={styles.infoText}> {user.email}</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </Pressable>
    </View>
  );
};



export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    gap: 10,
  },
  avatarContainer: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: -30,
    right: -12,
    padding:7,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: 30,
    paddingTop: 10,
    fontWeight: '500',
    color: '#333',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 10,
  },
  infoText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#888',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})
