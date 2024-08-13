import { Alert, StyleSheet, Text, View, ScrollView, Button, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import {
  useDeleteAuthorMutation,
  useGetAuthorsQuery,
  useGetBooksQuery,
} from '../redux/adminApi';

const Admin = () => {
  const { setAuth } = useAuth();
  const [filterType, setFilterType] = useState<'books' | 'authors'>('books');
  const { data: authorsData, refetch: refetchAuthors } = useGetAuthorsQuery('');
  const { data: booksData, refetch: refetchBooks } = useGetBooksQuery('');
  const [deleteAuthor] = useDeleteAuthorMutation();
  const [isUpdatePanelVisible, setIsUpdatePanelVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Çıkış Yapılamadı', error.message);
    }
  };

  const handleFilterChange = (filterType: 'books' | 'authors') => {
    setFilterType(filterType);
  };

  const handleDeleteBook = (id: number) => {
    Alert.alert(
      'Kitap Silme',
      'Kitabı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              const { error: deleteError } = await supabase
                .from('books')
                .delete()
                .eq('id', id);
              if (deleteError) {
                Alert.alert('Hata', 'Kitap silinirken bir hata oluştu');
                return;
              }
              Alert.alert('Başarılı', 'Kitap başarıyla silindi');
              refetchBooks();
            } catch (error) {
              Alert.alert('Hata', 'Kitap silinirken bir hata oluştu');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAuthor = async (id: number) => {
    Alert.alert(
      'Yazar Silme',
      'Yazarı silmek istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            const { data, error } = await deleteAuthor(id);
            if (error) {
              Alert.alert('Hata', 'Yazar silinirken bir hata oluştu');
              return;
            }
            Alert.alert('Başarılı', 'Yazar başarıyla silindi');
            refetchAuthors();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdateBook = (book: any) => {
    setSelectedBook(book);
    setIsUpdatePanelVisible(true);
  };

  const handleUpdateAuthor = (author: any) => {
    setSelectedAuthor(author); 
    setIsUpdatePanelVisible(true); 
  };

  const handleSaveUpdate = async () => {
    if (selectedBook) {
      try {
        const { error: updateError } = await supabase
          .from('books')
          .update({ title: selectedBook.title, genre: selectedBook.genre })
          .eq('id', selectedBook.id);
        if (updateError) {
          Alert.alert('Hata', 'Kitap güncellenirken bir hata oluştu');
          return;
        }
        Alert.alert('Başarılı', 'Kitap başarıyla güncellendi');
        setIsUpdatePanelVisible(false);
        refetchBooks();
      } catch (error) {
        Alert.alert('Hata', 'Kitap güncellenirken bir hata oluştu');
      }
    } else if (selectedAuthor) {
      try {
        const { data, error } = await supabase
          .from('authors')
          .update({ name: selectedAuthor.name })
          .eq('id', selectedAuthor.id);

        if (error) {
          Alert.alert('Hata', 'Yazar güncellenirken bir hata oluştu');
          return;
        }
        Alert.alert('Başarılı', 'Yazar başarıyla güncellendi');
        setIsUpdatePanelVisible(false);
        refetchAuthors();

      }
      catch (error) {
        Alert.alert('Hata', 'Yazar güncellenirken bir hata oluştu');
      }
    }

  };

  return (
    <View style={styles.container}>
      <Header
        title="Admin Paneli"
        setSearchQuery={() => {}}
        onFilterChange={handleFilterChange}
        showSearch={false}
        showFilter={true}
        showSort={false}
      />
      <ScrollView style={styles.content}>
        <View style={styles.listContainer}>
          {filterType === 'books' ? (
            <Text style={styles.filterStyle}> Kitaplar </Text>
          ) : (
            <Text style={styles.filterStyle}> Yazarlar </Text>
          )}
          {filterType === 'books'
            ? booksData?.map((book: any) => (
                <View key={book.id} style={styles.item}>
                  <Text style={styles.title}>{book.title}</Text>
                  <View style={styles.textInfo}>
                    <Text>ISBN: {book.isbn}</Text>
                    <Text>Tür: {book.genre}</Text>
                  </View>
                  <View style={styles.button}>
                    <Button
                      title="Güncelle"
                      onPress={() => handleUpdateBook(book)}
                      color={'#3caae5'}
                    />
                    <Button
                      title="Sil"
                      onPress={() => handleDeleteBook(book.id)}
                      color="#ac290d"
                    />
                  </View>
                </View>
              ))
            : authorsData?.map((author: any) => (
                <View key={author.id} style={styles.item}>
                  <Text style={styles.title}>{author.name}</Text>
                  <View style={styles.button}>
                    <Button
                      title="Güncelle"
                      onPress={() => handleUpdateAuthor(author)}
                      color={'#3caae5'}
                    />
                    <Button
                      title="Sil"
                      onPress={() => handleDeleteAuthor(author.id)}
                      color="#ac290d"
                    />
                  </View>
                </View>
              ))}
        </View>
      </ScrollView>
      <Button title="Çıkış Yap" onPress={onLogout} />

      <Modal
        visible={isUpdatePanelVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsUpdatePanelVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedBook ? 'Kitap Güncelle' : 'Yazar Güncelle'}
            </Text>
            {selectedBook && (
              <>
                <TextInput
                  style={styles.input}
                  value={selectedBook?.title}
                  onChangeText={(text) =>
                    setSelectedBook({ ...selectedBook, title: text })
                  }
                  placeholder="Kitap Başlığı"
                />
                <TextInput
                  style={styles.input}
                  value={selectedBook?.genre}
                  onChangeText={(text) =>
                    setSelectedBook({ ...selectedBook, genre: text })
                  }
                  placeholder="Tür"
                />
              </>
            )}
            {selectedAuthor && (
              <TextInput
                style={styles.input}
                value={selectedAuthor?.name}
                onChangeText={(text) =>
                  setSelectedAuthor({ ...selectedAuthor, name: text })
                }
                placeholder="Yazar Adı"
              />
            )}
            <Button title="Kaydet" onPress={handleSaveUpdate} color={'#3caae5'} />
            <Button
              title="İptal"
              onPress={() => setIsUpdatePanelVisible(false)}
              color="#ac290d"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingTop: 20,
  },
  item: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  filterStyle: {
    padding: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textInfo: {
    fontSize: 25,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    marginTop: 15,
    width: '50%',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    padding: 25,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
});