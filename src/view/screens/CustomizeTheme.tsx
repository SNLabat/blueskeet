import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps, CommonNavigatorParams } from 'lib/routes/types';
import { withAuthRequired } from 'view/com/auth/withAuthRequired';
import * as AppInfo from 'lib/app-info';
import { useStores } from 'state/index';
import { s, colors } from 'lib/styles';
import { ScrollView } from '../com/util/Views';
import { ViewHeader } from '../com/util/ViewHeader';
import { Link } from '../com/util/Link';
import { Text } from '../com/util/text/Text';
import * as Toast from '../com/util/Toast';
import { UserAvatar } from '../com/util/UserAvatar';
import { DropdownButton } from 'view/com/util/forms/DropdownButton';
import { usePalette } from 'lib/hooks/usePalette';
import { useCustomPalette } from 'lib/hooks/useCustomPalette';
import { AccountData } from 'state/models/session';
import { useAnalytics } from 'lib/analytics';
import { NavigationProp } from 'lib/routes/types';
import { isDesktopWeb } from 'platform/detection';
import { pluralize } from 'lib/strings/helpers';
import { formatCount } from 'view/com/util/numeric/format';

type Props = NativeStackScreenProps<CommonNavigatorParams, 'Settings'>;

export const CustomizeThemeScreen = withAuthRequired(
  observer(function Themes({}: Props) {
    const pal = usePalette('default');
    const store = useStores();
    const navigation = useNavigation<NavigationProp>();
    const { screen, track } = useAnalytics();
    const [isSwitching, setIsSwitching] = React.useState(false);

    const primaryBg = useCustomPalette<ViewStyle>({
      light: { backgroundColor: colors.blue0 },
      dark: { backgroundColor: colors.blue6 },
    });
    const primaryText = useCustomPalette<TextStyle>({
      light: { color: colors.blue3 },
      dark: { color: colors.blue2 },
    });

    const dangerBg = useCustomPalette<ViewStyle>({
      light: { backgroundColor: colors.red1 },
      dark: { backgroundColor: colors.red7 },
    });
    const dangerText = useCustomPalette<TextStyle>({
      light: { color: colors.red4 },
      dark: { color: colors.red2 },
    });

    useFocusEffect(
      React.useCallback(() => {
        screen('Themes');
        store.shell.setMinimalShellMode(false);
      }, [screen, store]),
    );

    const onPressSwitchAccount = React.useCallback(
      async (acct: AccountData) => {
        track('Settings:SwitchAccountButtonClicked');
        setIsSwitching(true);
        if (await store.session.resumeSession(acct)) {
          setIsSwitching(false);
          navigation.navigate('HomeTab');
          navigation.dispatch(StackActions.popToTop());
          Toast.show(`Signed in as ${acct.displayName || acct.handle}`);
          return;
        }
        setIsSwitching(false);
        Toast.show('Sorry! We need you to enter your password.');
        navigation.navigate('HomeTab');
        navigation.dispatch(StackActions.popToTop());
        store.session.clear();
      },
      [track, setIsSwitching, navigation, store],
    );

    const onPressAddAccount = React.useCallback(() => {
      track('Settings:AddAccountButtonClicked');
      navigation.navigate('HomeTab');
      navigation.dispatch(StackActions.popToTop());
      store.session.clear();
    }, [track, navigation, store]);

    const onPressChangeHandle = React.useCallback(() => {
      track('Settings:ChangeHandleButtonClicked');
      store.shell.openModal({
        name: 'change-handle',
        onChanged() {
          setIsSwitching(true);
          store.session.reloadFromServer().then(
            () => {
              setIsSwitching(false);
              Toast.show('Your handle has been updated');
            },
            err => {
              store.log.error(
                'Failed to reload from server after handle update',
                { err },
              );
              setIsSwitching(false);
            },
          );
        },
      });
    }, [track, store, setIsSwitching]);

    const onPressInviteCodes = React.useCallback(() => {
      track('Settings:InvitecodesButtonClicked');
      store.shell.openModal({ name: 'invite-codes' });
    }, [track, store]);

    const onPressContentLanguages = React.useCallback(() => {
      track('Settings:ContentlanguagesButtonClicked');
      store.shell.openModal({ name: 'content-languages-settings' });
    }, [track, store]);

    const onPressSignout = React.useCallback(() => {
      track('Settings:SignOutButtonClicked');
      store.session.logout();
    }, [track, store]);

    const onPressDeleteAccount = React.useCallback(() => {
      store.shell.openModal({ name: 'delete-account' });
    }, [store]);

    const onPressTheme = (title: string) => {
      // Handle theme selection
    };

    const renderTheme = (title: string, colorCode: string) => {
      const themeStyle = {
        backgroundColor: colorCode,
      };

      return (
        <TouchableOpacity
          key={title}
          style={[styles.themeContainer, themeStyle]}
          onPress={() => onPressTheme(title)}
          accessibilityRole="button"
          accessibilityLabel={title}
          accessibilityHint={`Select ${title} theme`}
        >
          <Text style={styles.themeTitle}>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={[s.hContentRegion]} testID="settingsScreen">
        <ViewHeader title="Settings" />
        <ScrollView
          style={[s.hContentRegion]}
          contentContainerStyle={!isDesktopWeb && pal.viewLight}
          scrollIndicatorInsets={{ right: 1 }}
        >
          <View style={styles.spacer20} />
          {store.session.currentSession !== undefined ? (
            <>
              <Text type="xl-bold" style={[pal.text, styles.heading]}>
                Select a Theme
              </Text>
              <View style={[styles.infoLine]}>
                <Text type="lg-medium" style={pal.text}>
                  Customize blueskeet to make it yours.
                  <Text type="lg" style={pal.text}></Text>
                </Text>
              </View>
              <View style={styles.spacer20} />
            </>
          ) : null}

          <Text type="xl-bold" style={[pal.text, styles.heading]}>
            Available Themes
          </Text>
          <View style={[styles.gridContainer, styles.themeBox]}>
            {renderTheme("Slate", "#f8fafc")}
            {renderTheme("Gray", "#f9fafb")}
            {renderTheme("Zinc", "#fafafa")}
            {renderTheme("Neutral", "#fafafa")}
            {renderTheme("Stone", "#fafaf9")}
            {renderTheme("Red", "#fef2f2")}
            {renderTheme("Orange", "#fff7ed")}
            {renderTheme("Amber", "#fffbeb")}
            {renderTheme("Yellow", "#fefce8")}
            {renderTheme("Lime", "#f7fee7")}
            {renderTheme("Green", "#f0fdf4")}
            {renderTheme("Emerald", "#ecfdf5")}
            {renderTheme("Teal", "#f0fdfa")}
            {renderTheme("Cyan", "#ecfeff")}
            {renderTheme("Sky", "#f0f9ff")}
            {renderTheme("Blue", "#eff6ff")}
            {renderTheme("Indigo", "#eef2ff")}
            {renderTheme("Violet", "#f5f3ff")}
            {renderTheme("Purple", "#faf5ff")}
            {renderTheme("Fuchsia", "#fdf4ff")}
            {renderTheme("Pink", "#fdf2f8")}
            {renderTheme("Rose", "#fff1f2")}
          </View>
        </ScrollView>
      </View>
    );
  }),
);
  
const styles = StyleSheet.create({
  spacer20: {
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeContainer: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  dimmed: {
    opacity: 0.5,
  },
  avi: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deleteAccountCard: {
    marginTop: 20,

  },
});

export default CustomizeThemeScreen;
