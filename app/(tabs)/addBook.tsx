import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAddBookMutation, useGetAuthorsQuery, useAddBookAuthorMutation, useDeleteBookMutation, useGetBooksQuery } from '../redux/booksApi';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '@/lib/supabase';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';



const AddBook = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null); 

  const { data: authors = [] } = useGetAuthorsQuery({});
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [addBookAuthor] = useAddBookAuthorMutation();
  const [deleteBook] = useDeleteBookMutation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


  const handleAddBook = async () => {
    const coverimage = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  
    try {
      const newBook = { title, isbn, genre, coverimage };
      const addedBook = await addBook(newBook).unwrap();
      
      console.log('Added Book:', addedBook);
  
      const { data: bookData, error } = await supabase.from('books').select('id').eq('isbn', isbn).single();
      const bookId = bookData?.id;
      if (selectedAuthorId) {
        const bookAuthor = { book_id: bookId, author_id: selectedAuthorId };
        await addBookAuthor(bookAuthor).unwrap();
      }
      setTitle('');
      setIsbn('');
      setGenre('');
      setSelectedAuthorId(null);

      alert('Kitap başarıyla eklendi!');
      navigation.navigate('books');
    } catch (error: any) {
      console.error('Hata:', error);
  
      if (error.data?.book_id) {
        await deleteBook(error.data.book_id).unwrap();
      }
  
      alert('Kitap eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kitap Adı</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Kitap Adını Girin"
      />
      <Text style={styles.label}>ISBN Numarası</Text>
      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="ISBN Numarasını Girin"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Tür</Text>
      <TextInput
        style={styles.input}
        value={genre}
        onChangeText={setGenre}
        placeholder="Kitap Türünü Girin"
      />
      <Text style={styles.label}>Yazar Seç</Text>
      <Picker
        selectedValue={selectedAuthorId}
        onValueChange={(itemValue) => setSelectedAuthorId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Yazar Seçin" value={null} />
        {authors.map((author: any) => (
          <Picker.Item key={author.id} label={author.name} value={author.id} />
        ))}
      </Picker>
      <Button
        title="Kitap Ekle"
        onPress={handleAddBook}
        disabled={isLoading || !title || !isbn || !genre}
      />
      {isError && <Text style={styles.error}>Kitap eklenirken bir hata oluştu.</Text>}
    </View>
  );
};

export default AddBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});
