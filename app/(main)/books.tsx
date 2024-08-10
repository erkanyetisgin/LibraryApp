import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useGetBooksQuery } from '../redux/booksApi';
import { hp } from '@/helpers/common';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { ParamListBase, useNavigation, useFocusEffect } from '@react-navigation/native';

const Books = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: books, error, isLoading, refetch } = useGetBooksQuery(searchQuery);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.bookItem}>
      <Image
        source={{ uri: item.coverimage }} 
        style={styles.bookImage} 
      />
      <View style={styles.bookInfo}>
        <Text  style={styles.bookTitle}>{item.title}</Text>
        <Text>{item.author}</Text>
        <Text>ISBN :{item.isbn}</Text>
        <Text>Tür: {item.genre}</Text>
      </View>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Kitaplar" 
        setSearchQuery={setSearchQuery} 
        showSearch={true}
        showFilter={true} 
        showSort={true} 
      />
      <View style={styles.content}>
        {isLoading ? (
          <Text>Yükleniyor...</Text>
        ) : error ? (
          <Text>Hata: {error.toString()}</Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('addBook')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1,
    paddingBottom: hp(15),
  },
  button: {
    position: 'absolute',
    right: hp(2),
    bottom: hp(17),
    width: hp(7),
    height: hp(7),
    borderRadius: 30,
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
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
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
