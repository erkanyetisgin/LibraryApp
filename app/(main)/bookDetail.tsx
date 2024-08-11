import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useAddUserBookMutation } from '../redux/booksApi';
import { supabase } from '@/lib/supabase';
type RootStackParamList = {
  BookDetail: { book: any };
};

type BookDetailRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;

const BookDetail = () => {
  const route = useRoute<BookDetailRouteProp>();
  const navigation = useNavigation();
  const { book } = route.params;

  if (!book || !book.book_id) {
    alert('Kitap bilgisi bulunamadı.');
    return null;
  }

  const [addUserBook, { isLoading }] = useAddUserBookMutation();

  const handleAddBook = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        alert('Kullanıcı oturumu bulunamadı.');
        return;
      }

      const response = await addUserBook({ userId: user.id, bookId: book.book_id });
      if (response.error) {
        console.error('Kitap ekleme hatası:', response.error);
        alert('Kitap eklenemedi. Tekrar deneyin.');
        return;
      }
      alert('Kitap eklendi!');
      navigation.goBack();
    } catch (error) {
      console.error('Kitap ekleme hatası:', error);
      alert('Kitap eklenemedi. Tekrar deneyin.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.coverimage }} style={styles.bookImage} />
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>Yazarlar: {book.author_names}</Text>
        <Text style={styles.bookDetail}>ISBN: {book.isbn}</Text>
        <Text style={styles.bookDetail}>Tür: {book.genre}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddBook} disabled={isLoading}>
        <Text style={styles.addButtonText}>{isLoading ? 'Ekleniyor...' : 'Kitabı Ekle'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  bookInfoContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  bookTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  bookDetail: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
