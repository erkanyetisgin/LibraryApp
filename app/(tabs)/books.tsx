import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import Header from '@/components/Header';
import { useGetBooksWithAuthorsQuery } from '../redux/booksApi'; 
import { hp } from '@/helpers/common';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { ParamListBase, useNavigation, useFocusEffect } from '@react-navigation/native';

const Books = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('name_asc');
  const { data: books, error, isLoading, refetch } = useGetBooksWithAuthorsQuery({
    searchQuery: searchQuery || '',
    sortBy: sortType.includes('name') ? 'title' : 'created_at',
    sortDirection: sortType.includes('_asc') ? 'asc' : 'desc',
});
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const sortedBooks = () => {
    if (!books) return [];
  
    return books.slice().sort((a: any, b: any) => {
      if (sortType === 'name_asc') {
        return a.title.localeCompare(b.title);
      } else if (sortType === 'name_desc') {
        return b.title.localeCompare(a.title);
      } else if (sortType === 'date_asc') {
        return new Date(a.published_date || 0).getTime() - new Date(b.created_at || 0).getTime();
      } else if (sortType === 'date_desc') {
        return new Date(b.published_date || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
      return 0;
    });
  };

  const renderItem = ({ item }: { item: any }) => (
<Pressable onPress={() => navigation.navigate('bookDetail', { book: item, fromScreen: 'books' })}>
      <View style={styles.bookItem}>
        <Image source={{ uri: item.coverimage }} style={styles.bookImage} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookText}>Yazar: {item.author_names}</Text>
          <Text style={styles.bookText}>ISBN: {item.isbn}</Text>
          <Text style={styles.bookText}>Tür: {item.genre}</Text>
        </View>
      </View>
    </Pressable>
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
        showFilter={false} 
        showSort={true} 
        onSortPress={(type: string) => setSortType(type)} 
      />
      <View style={styles.content}>
        {isLoading ? (
          <Text>Yükleniyor...</Text>
        ) : error ? (
          <Text>Hata: {JSON.stringify(error)}</Text>
        ) : (
          <FlatList
            data={sortedBooks()}
            keyExtractor={(item) => item.book_id.toString()} 
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
  bookText: {
    fontSize: 16,
    
  },
});
