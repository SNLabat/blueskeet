import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomizeTheme = () => {
  const [selectedColor, setSelectedColor] = useState('');

  const pal = {
    view: {
      backgroundColor: selectedColor || 'white', // use selectedColor if it exists, otherwise use white
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    colorOption: {
      width: 50,
      height: 50,
      borderRadius: 25,
      margin: 10,
    },
  };

  const colors = [
    ['#FF0000', '#FFA500'],
    ['#FFC0CB', '#FF1493'],
    ['#FFD700', '#FF8C00'],
    ['#00FF00', '#32CD32'],
    ['#0000FF', '#1E90FF'],
    ['#9400D3', '#8A2BE2'],
  ];

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

  return (
    <View style={pal.view}>
      <Text style={pal.text}>Select a theme:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color[0]}
            style={pal.colorOption}
            onPress={() => handleColorSelection(color[0])}
          >
            <LinearGradient
              colors={color}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 25,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
      {selectedColor !== '' && (
        <Text style={{ marginTop: 20 }}>
          You have selected {selectedColor} as your theme color.
        </Text>
      )}
    </View>
  );
};

export default CustomizeTheme;
