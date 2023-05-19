import React from 'react'
import { StyleSheet, Pressable, View, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { observer } from 'mobx-react-lite'
import { useStores } from 'state/index'
import { ToggleButton } from '../util/forms/ToggleButton'
import { s, colors, gradients } from 'lib/styles'
import { Text } from '../util/text/Text'
import { usePalette } from 'lib/hooks/usePalette'
import { isDesktopWeb } from 'platform/detection'

export const snapPoints = ['100%']

export function CustomizeThemeModal() {
  const store = useStores()
  const pal = usePalette('default')
  const onPressDone = React.useCallback(() => {
    store.shell.closeModal() 
  }, [store])

  const themes = React.useMemo(() => {
    const themeList = ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4', 'Theme 5', 'Theme 6', 'Theme 7', 'Theme 8', 'Theme 9', 'Theme 10']
    return themeList
  }, [store])

  return (
    <View testID="customizeThemeModal" style={[pal.view, styles.container]}>
      <Text style={[pal.text, styles.title]}>Select a Theme</Text>
      <Text style={[pal.text, styles.description]}>
        Customize blueskeet to your liking.
      </Text>
      <ScrollView style={styles.scrollContainer}>
        {themes.map((theme, index) => (
          <ThemeToggle
            key={index}
            name={theme}
          />
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <View style={[styles.btnContainer, pal.borderDark]}>
        <Pressable
          testID="confirmThemeBtn"
          onPress={onPressDone}
          accessibilityRole="button"
          accessibilityLabel="Confirm theme settings"
          accessibilityHint="">
          <LinearGradient
            colors={[gradients.blueLight.start, gradients.blueLight.end]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.btn]}>
            <Text style={[s.white, s.bold, s.f18]}>Done</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const ThemeToggle = observer(
  ({name}: {name: string}) => {
    const store = useStores()
    const pal = usePalette('default')

    const onPress = React.useCallback(() => {
      store.preferences.toggleTheme(name) 
    }, [store, name])

    return (
      <ToggleButton
        label={name}
        isSelected={store.preferences.currentTheme === name}
        onPress={onPress}
        style={[pal.border, styles.themeToggle]}
      />
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  bottomSpacer: {
    height: isDesktopWeb ? 0 : 60,
  },
  btnContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: isDesktopWeb ? 0 : 40,
    borderTopWidth: isDesktopWeb ? 0 : 1,
  },
  themeToggle: {
    borderTopWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 32,
    padding: 14,
    backgroundColor: colors.gray1,
  },
})


export default CustomizeThemeModal;