import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type ColorOption = [string, string];

const CustomizeTheme: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      setSelectedColor('');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
      setSelectedColor(storedColor);
    }
  }, []);

  const themeStyle = {
    text: {
      color: selectedColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
    },
  };

  const handlePress = () => {
    console.log('Hello!');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, themeStyle.text]}>Select a theme:</Text>
      <Button title="Hello" onPress={handlePress} />
};
    </View>
  );
};

export default CustomizeTheme;
