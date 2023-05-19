    import React from 'react';
    import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
    import LinearGradient from 'react-native-linear-gradient';
    import {observe} from 'mobx';
    import {useStores} from '../../../src/state/models/root-store';
    import {usePalette} from '../../../src/lib/hooks/usePalette';
    import {ToggleButton} from '../../../src/view/com/util/forms/ToggleButton';
    import { isDesktopWeb } from '../../platform/detection';
    import { s, gradients, colors } from '../../../src/lib/styles';
import { observer } from 'mobx-react-lite';

    const CustomizeThemeScreen = () => {
        const store = useStores();
        const pal = usePalette('default');

        const themes = ['light', 'dark', 'blue', 'green', 'purple', 'pink'];

        const onPressDone = React.useCallback(() => {
            store.preferences.save();
        }, [store]);

        return (
            <View style={[styles.container, pal.bg]}>
                <Text style={[pal.text, styles.title]}>Customize Theme</Text>
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
    export default CustomizeThemeScreen;

