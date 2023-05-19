import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { slateTheme, grayTheme, zincTheme, neutralTheme, stoneTheme, redTheme, orangeTheme, amberTheme, yellowTheme, limeTheme, greenTheme, emeraldTheme, tealTheme, cyanTheme, skyTheme, blueTheme, indigoTheme, violetTheme, purpleTheme, fuchsiaTheme, pinkTheme, roseTheme } from './src/lib/themes';

type ColorOption = [string, string];

const CustomizeTheme: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const windowDimensions = useWindowDimensions();

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
    colorOptionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: 800,
    },
    colorOption: {
      aspectRatio: 1,
      borderRadius: 10,
      marginBottom: 20,
    },
  });

  const colors: ColorOption[] = [
    ...slateTheme,
    ...grayTheme,
    ...zincTheme,
    ...neutralTheme,
    ...stoneTheme,
    ...redTheme,
    ...orangeTheme,
    ...amberTheme,
    ...yellowTheme,
    ...limeTheme,
    ...greenTheme,
    ...emeraldTheme,
    ...tealTheme,
    ...cyanTheme,
    ...skyTheme,
    ...blueTheme,
    ...indigoTheme,
    ...violetTheme,
    ...purpleTheme,
    ...fuchsiaTheme,
    ...pinkTheme,
    ...roseTheme,
    ...darkTheme,
    ...defaultTheme,
  ];

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

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    localStorage.setItem('selectedColor', color);
  };

  const themeStyle = {
    container: {
      backgroundColor: selectedColor,
    },
    text: {
      color: selectedColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
    },
  };

  return (
    <View style={[styles.container, themeStyle.container]}>
      <View style={styles.colorOptionContainer}>
        {colors.map(([color, hex]) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorOption, { backgroundColor: hex }]}
            onPress={() => handleColorSelection(hex)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${color} as your theme color`}
            accessibilityHint="Double tap to select"
          >
            <LinearGradient
              colors={[hex, hex]}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.text, themeStyle.text]}>Select a theme:</Text>
      {selectedColor !== '' && (
        <Text style={[{ marginTop: 20 }, themeStyle.text]}>
          You have selected {selectedColor} as your theme color.
        </Text>
      )}
    </View>
  );
};

export default CustomizeTheme;
