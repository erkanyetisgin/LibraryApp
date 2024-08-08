import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { supabase } from '../../lib/supabase';

interface BooksListProps {
  visible: boolean;
  onClose: () => void;
  selectedAuthor: any;
  authorId: number | null;
}

const BooksList: React.FC<BooksListProps> = ({ visible, onClose, selectedAuthor, authorId }) => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    if (authorId !== null) {
      fetchBooksByAuthor(authorId);
    }
  }, [authorId]);

  const fetchBooksByAuthor = async (authorId: number) => {
    const { data, error } = await supabase
      .from('bookauthors')
      .select(`
        books (
          id, 
          title, 
          coverimage
        )
      `)
      .eq('author_id', authorId);

    if (error) {
      console.error('Error fetching books:', error);
    } else {
      if (data && data.length > 0) {
        const fetchedBooks = data.map((ba: any) => ba.books);
        setBooks(fetchedBooks);
      } else {
        console.log('No books found for this author.');
        setBooks([]);
      }
    }
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <View style={styles.bookItem}>
      {item.coverimage ? (
        <Image 
          source={{ uri: item.coverimage }} 
          style={styles.bookImage} 
          onError={() => console.log('Failed to load image: ', item.coverimage)} 
        />
      ) : (
        <View style={styles.bookPlaceholder}>
          <Text style={styles.bookPlaceholderText}>{item.title.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.bookTitle}>{item.title}</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true} 
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedAuthor?.name} - Kitapları</Text>
          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BooksList;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%', 
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bookImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  bookPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookPlaceholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  closeButton: {
    color: '#1E90FF',
    marginTop: 20,
    textAlign: 'right',
    fontSize: 18,
  },
});
