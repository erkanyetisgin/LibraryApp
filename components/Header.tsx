import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import Icon from '@/assets/icons';
import { hp } from '@/helpers/common';

interface HeaderProps {
  title: string;
  setSearchQuery: (query: string) => void;
  onSortPress?: (sortType: string) => void;
  onFilterChange?: (filterType: 'books' | 'authors') => void;
  showFilter?: boolean;
  showSort?: boolean;
  showSearch?: boolean;
}
const Header = ({
  title,
  setSearchQuery,
  onSortPress,
  onFilterChange,
  showSearch = false,
  showFilter = false,
  showSort = false,
}: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [filterType, setFilterType] = useState<'books' | 'authors'>('books');
  const slideAnim = useState(new Animated.Value(0))[0];

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

  const toggleSortMenu = () => {
    setSortMenuVisible(!sortMenuVisible);
    Animated.timing(slideAnim, {
      toValue: sortMenuVisible ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleSort = (sortType: string) => {
    setSortMenuVisible(false);
    onSortPress && onSortPress(sortType);
  };

  const handleFilter = (selectedFilterType: 'books' | 'authors') => {
    setFilterType(selectedFilterType); 
    setFilterMenuVisible(false);
    onFilterChange && onFilterChange(selectedFilterType);
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
          <>
            <TouchableOpacity onPress={toggleFilterMenu} style={styles.icon}>
              <Icon name="filter" size={24} colors="black" />
            </TouchableOpacity>
            {filterMenuVisible && (
              <View style={styles.filterMenu}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filterType === 'books' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleFilter('books')}
                >
                  <Text>Kitaplar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filterType === 'authors' && styles.selectedFilterOption,
                  ]}
                  onPress={() => handleFilter('authors')}
                >
                  <Text>Yazarlar</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        {showSort && (
          <>
            <TouchableOpacity onPress={toggleSortMenu} style={styles.icon}>
              <Icon name="sort" size={24} colors="black" />
            </TouchableOpacity>
            {sortMenuVisible && (
              <Animated.View style={[styles.sortMenu, { transform: [{ translateY: slideAnim }] }]}>
                <TouchableOpacity onPress={() => handleSort('name_asc')} style={styles.sortOption}>
                  <Text>İsme Göre Sırala (A-Z)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSort('name_desc')} style={styles.sortOption}>
                  <Text>İsme Göre Sırala (Z-A)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSort('date_asc')} style={styles.sortOption}>
                  <Text>Tarihe Göre Sırala (Eski-Yeni)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSort('date_desc')} style={styles.sortOption}>
                  <Text>Tarihe Göre Sırala (Yeni-Eski)</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </>
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
    zIndex: 2000, 
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  sortMenu: {
    position: 'absolute',
    top: hp(-7), 
    right: hp(-2),
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 3000,  
    padding: 5,
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  sortOption: {
    paddingVertical: 10,
  },
  filterMenu: {
    position: 'absolute',
    top: hp(5),
    right: hp(0),
    backgroundColor: '#fff',
    borderRadius: 10,
    zIndex: 3000,
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterOption: {
    paddingVertical: 15,
  },
  selectedFilterOption: {
    backgroundColor: '#f0f0f0',
  },
});
