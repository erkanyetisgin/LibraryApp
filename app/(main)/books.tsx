import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { hp } from '@/helpers/common';

const books = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Books</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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