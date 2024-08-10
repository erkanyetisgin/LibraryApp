import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from '@/assets/icons';

interface HeaderProps {
  title: string;
  setSearchQuery: (query: string) => void;
  onFilterPress?: () => void;
  onSortPress?: () => void;
  showFilter?: boolean;
  showSort?: boolean;
  showSearch?: boolean;
}

const Header = ({
  title,
  setSearchQuery,
  onFilterPress,
  onSortPress,
  showSearch = false,
  showFilter = false,
  showSort = false,
}: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (query: string) => {
    setSearchInput(query);
    setSearchQuery(query);
  };

  const toggleSearch = () => {
    if (searchActive) {
      setSearchInput('');
      setSearchQuery(''); 
    }
    setSearchActive(!searchActive);
  };

  return (
    <View style={styles.header}>
      {searchActive ? (
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={handleSearch}
          placeholder="Ara..."
          autoFocus
        />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      
      <View style={styles.actions}>
        {showSearch && (
          <TouchableOpacity onPress={toggleSearch} style={styles.icon}>
            <Icon name="search" size={24} colors="black" />
          </TouchableOpacity>
        )}
        {showFilter && (
          <TouchableOpacity onPress={onFilterPress} style={styles.icon}>
            <Icon name="filter" size={24} colors="black" />
          </TouchableOpacity>
        )}
        {showSort && (
          <TouchableOpacity onPress={onSortPress}style={styles.icon}>
            <Icon name="sort" size={24} colors="black"  />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingTop: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});
