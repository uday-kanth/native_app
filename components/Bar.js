import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Bar = ({ setPage, page }) => {
  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={() => setPage(0)}>
        <View style={[styles.barItem, page === 0 && styles.selectedBarItem]}>
          <Text style={styles.barItemText}>Add_task</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage(1)}>
        <View style={[styles.barItem, page === 1 && styles.selectedBarItem]}>
          <Text style={styles.barItemText}>On going</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage(2)}>
        <View style={[styles.barItem, page === 2 && styles.selectedBarItem]}>
          <Text style={styles.barItemText}>Completed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#0077b6',
    fontSize: 20,
    marginBottom: 20,
  },
  barItem: {
    margin: 10,
    padding: 10,
    borderRadius: 20, // Adjust the border radius as needed
  },
  selectedBarItem: {
    backgroundColor: '#03045e',
  },
  barItemText: {
    textAlign: 'center',
    fontSize:20,
    color: 'white',
    fontWeight: '500',
  },
});

export default Bar;
