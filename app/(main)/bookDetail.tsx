import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface BookDetailModalProps {
  visible: boolean;
  onClose: () => void;
  book: any;
  onDelete: (bookId: string) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ visible, onClose, book, onDelete }) => {
  if (!book) return null;

  const handleDelete = () => {
    onDelete(book.id);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {book.coverImage && (
            <Image source={{ uri: book.coverImage }} style={styles.bookImage} />
          )}
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookDetail}>ISBN: {book.ISBN}</Text>
          <Text style={styles.bookDetail}>Yazar(lar): {book.authors.join(', ')}</Text>
          <Text style={styles.bookDetail}>Tür: {book.genre}</Text>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Kitabı Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BookDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6495ED',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
