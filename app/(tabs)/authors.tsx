import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Pressable, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import { hp } from '@/helpers/common';
import { useGetAuthorsQuery, useAddAuthorMutation } from '../redux/authorsApi';
import AuthorBooksModal from './booksList'; 
import AddAuthorModal from './addAuthor';

const Authors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addAuthorModalVisible, setAddAuthorModalVisible] = useState(false);
  const [authors, setAuthors] = useState<any[]>([]);

  const { data: fetchedAuthors = [], error, isLoading, refetch } = useGetAuthorsQuery(searchQuery);
  const [addAuthor] = useAddAuthorMutation();

  const fetchAuthorImages = useCallback(async (authorsList: any[]) => {
    const updatedAuthors = await Promise.all(
      authorsList.map(async (author: any) => {
        const imageUrl = await fetchAuthorImage(author.name);
        return { ...author, imageUrl };
      })
    );
    setAuthors(updatedAuthors);
  }, []);

  useEffect(() => {
    if (!isLoading && fetchedAuthors.length > 0) {
      setAuthors(fetchedAuthors);
      fetchAuthorImages(fetchedAuthors);
    }
  }, [isLoading, fetchedAuthors, fetchAuthorImages]);

  const handleAddAuthor = async (authorName: string) => {
    await addAuthor({ name: authorName });
    const { data: newAuthors } = await refetch();
    
    fetchAuthorImages(newAuthors);
  };

  const handleAuthorPress = (author: any) => {
    setSelectedAuthor(author);
    setModalVisible(true);
  };

  const fetchAuthorImage = async (authorName: string) => {
    const response = await fetch(`https://openlibrary.org/search/authors.json?q=${authorName}`);
    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      const authorOLID = data.docs[0].key.replace('/authors/', '');
      return `https://covers.openlibrary.org/a/olid/${authorOLID}-S.jpg`;
    }
  
    return null;
  };
  
  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => handleAuthorPress(item)}
      style={({ pressed }) => [
        styles.authorItem,
        { backgroundColor: pressed ? '#e0e0e0' : '#fff' },
      ]}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.authorImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{item.name.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.authorName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Header title="Yazarlar" setSearchQuery={setSearchQuery} showSearch={true}/>
      <View style={styles.content}>
        {isLoading ? (
          <Text>Yükleniyor...</Text>
        ) : error ? (
          <View>
            <Text>Hata oluştu: {(error as any)?.message}</Text>
            <Text>Detaylar: {JSON.stringify(error, null, 2)}</Text>
          </View>
        ) : (
          <FlatList
            data={authors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginBottom: hp(13) }}
          />
        )}
      </View>
      <AuthorBooksModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedAuthor={selectedAuthor}
        authorId={selectedAuthor?.id || null}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setAddAuthorModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      
      <AddAuthorModal
        visible={addAuthorModalVisible}
        onClose={() => setAddAuthorModalVisible(false)}
        onAddAuthor={handleAddAuthor}
      />
    </View>
  );
};

export default Authors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  authorItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6495ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
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
});
