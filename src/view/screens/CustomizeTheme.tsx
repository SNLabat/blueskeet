import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type ColorOption = [string, string];

const colorOptions: ColorOption[] = [
  ['#FFFFFF', '#000000'], // white background, black text
  ['#000000', '#FFFFFF'], // black background, white text
  ['#FF0000', '#FFFFFF'], // red background, white text
  ['#00FF00', '#000000'], // green background, black text
];

const CustomizeTheme: React.FC = () => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[selectedColorIndex][0]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: selectedColor,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colorOptions[selectedColorIndex][1],
    },
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSelectedColorIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedColorIndex', selectedColorIndex.toString());
    setSelectedColor(colorOptions[selectedColorIndex][0]);
  }, [selectedColorIndex]);

  const handlePress = () => {
    setSelectedColorIndex((selectedColorIndex + 1) % colorOptions.length);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>Select a theme:</Text>
      <Button title="Next Theme" onPress={handlePress} />
    </View>
  );
}

export default CustomizeTheme;
