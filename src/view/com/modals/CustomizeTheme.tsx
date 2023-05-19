import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite'
import { usePalette } from 'lib/hooks/usePalette';
import { useStores } from 'state/index'
import { ScrollView } from './util'

export function CustomizeThemeModal() {
  const store = useStores()
  const pal = usePalette('default')
  const onPressDone = React.useCallback(() => {
    // replace shell.closeModal() with your own modal closing function
    store.shell.closeModal() 
  }, [store])

  const themes = React.useMemo(() => {
    // replace this list with your actual themes data
    const themeList = ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4', 'Theme 5', 'Theme 6', 'Theme 7', 'Theme 8', 'Theme 9', 'Theme 10']
    return themeList
  }, [store])

  return (
    <View testID="customizeThemeModal" style={[pal.view, styles.container]}>
      <Text style={[pal.text, styles.title]}>Select a Theme</Text>
      <Text style={[pal.text, styles.description]}>Customize blueskeet to your liking.</Text>
      <ScrollView style={styles.scrollContainer}>
        {themes.map((theme, index) => (
          <ThemeToggle
            key={index}
            name={theme}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={onPressDone}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

const ThemeToggle = observer(
  ({name}: {name: string}) => {
    const store = useStores()
    const pal = usePalette('default')

    const onPress = React.useCallback(() => {
      // replace toggleTheme with your function to change the theme
      store.preferences.toggleTheme(name) 
    }, [store, name])

    return (
      <TouchableOpacity
        style={styles.option}
        onPress={onPress}>
        <Text style={styles.optionText}>{name}</Text>
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'blue', // replace with your actual button color
  },
  btnText: {
    color: 'white', // replace with your actual button text color
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CustomizeThemeModal;