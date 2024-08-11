import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import Header from '@/components/Header';
import { useMyBooksQuery, useDeleteMyBookMutation  } from '../redux/booksApi'; 
import { hp } from '@/helpers/common';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { ParamListBase, useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { useCallback } from 'react';

const Home = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      const id = data?.user?.id || '';
      if (id) {
        setUserId(id);
      } else {
        console.error('Invalid UUID:', id);
      }
    };

    fetchUserId();
  }, []);

  const { data: books, error, isLoading, refetch } = useMyBooksQuery(userId.trim());
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );


  

  const renderItem = ({ item }: { item: any }) => (
<Pressable onPress={() => navigation.navigate('bookDetail', { book: item, fromScreen: 'home' })}>
      <View style={styles.bookItem}>
        <Image source={{ uri: item.coverimage }} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text>ISBN: {item.isbn}</Text>
          <Text>Tür: {item.genre}</Text>
        </View>
      </View>
    </Pressable>
  );

  function setSearchQuery(query: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      <Header 
        title="Ana Sayfa" 
        setSearchQuery={setSearchQuery} 
        showSearch={false}
        showFilter={false} 
        showSort={false} 
      />
      <View style={styles.content}>
        {isLoading ? (
          <Text>Yükleniyor...</Text>
        ) : error ? (
          <Text>Hata: {JSON.stringify(error)}</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.book_id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1,
    paddingBottom: hp(15),
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  bookImage: {
    width: 60,
    height: 90,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});
