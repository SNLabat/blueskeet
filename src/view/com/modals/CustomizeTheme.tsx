import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { usePalette } from 'lib/hooks/usePalette';

const CustomizeThemeModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pal = usePalette('default')

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View testID="contentLanguagesModal" style={[pal.view, styles.container]}>
    <Text style={[pal.text, styles.title]}>Select a Theme</Text>
    <Text style={[pal.text, styles.description]}>
      Customize blueskeet to your liking.
    </Text>
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Customize Theme</Text>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 1 selected')}>
            <Text style={styles.optionText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 2 selected')}>
            <Text style={styles.optionText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 3 selected')}>
            <Text style={styles.optionText}>Option 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 4 selected')}>
            <Text style={styles.optionText}>Option 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 5 selected')}>
            <Text style={styles.optionText}>Option 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 6 selected')}>
            <Text style={styles.optionText}>Option 6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 7 selected')}>
            <Text style={styles.optionText}>Option 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 8 selected')}>
            <Text style={styles.optionText}>Option 8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 9 selected')}>
            <Text style={styles.optionText}>Option 9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => console.log('Option 10 selected')}>
            <Text style={styles.optionText}>Option 10</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={toggleModal} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
  },
});

export default CustomizeThemeModal;