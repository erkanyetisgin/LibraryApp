import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

const AddAuthorModal = ({ visible, onClose, onAddAuthor }: { visible: boolean, onClose: () => void, onAddAuthor: (name: string) => Promise<void> }) => {
  const [name, setName] = useState('');

  const handleAddAuthor = async () => {
    if (name.trim()) {
      await onAddAuthor(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: '80%', padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
          <TextInput
            placeholder="Yazar Adı"
            value={name}
            onChangeText={setName}
            style={{ borderBottomWidth: 1, marginBottom: 20, fontSize: 18 }}
          />
          <TouchableOpacity onPress={handleAddAuthor} style={{ backgroundColor: '#6495ED', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddAuthorModal;
