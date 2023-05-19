import React, { useState, useEffect } from 'react';
import 'lib/sentry'; // must be relatively on top
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as view from './view/index';
import * as analytics from 'lib/analytics';
import { RootStoreModel, setupState, RootStoreProvider } from './state';
import { Shell } from './view/shell/index';
import { ToastContainer } from './view/com/util/Toast.web';
import { ColorScheme, ThemeProvider } from 'lib/ThemeContext';
import { observer } from 'mobx-react-lite';

const THEMES = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'dark',
  'default',
];

const App = observer(() => {
  const [rootStore, setRootStore] = useState<RootStoreModel | undefined>(undefined);
  const [themeIndex, setThemeIndex] = useState(0);
  const [skeetMode, setSkeetMode] = useState(false);

  // init
  useEffect(() => {
    view.setup();
    setupState().then(store => {
      setRootStore(store);
      analytics.init(store);
    });
  }, []);

  // show nothing prior to init
  if (!rootStore) {
    return null;
  }

  const handleThemeChange = () => {
    const newThemeIndex = (themeIndex + 1) % THEMES.length;
    const newTheme = THEMES[newThemeIndex];
    setThemeIndex(newThemeIndex);
  };

  const handleSkeetModeToggle = () => {
    setSkeetMode(prevMode => !prevMode);
  };

  return (
    <>
      <button onClick={handleSkeetModeToggle}>Toggle Skeet Mode</button>
      <button onClick={handleThemeChange}>Change Theme</button>
      <ThemeProvider theme={THEMES[themeIndex] as ColorScheme}>
        <RootSiblingParent>
          <analytics.Provider>
            <RootStoreProvider value={rootStore}>
              <SafeAreaProvider>
                <Shell skeetMode={skeetMode} />
              </SafeAreaProvider>
              <ToastContainer />
            </RootStoreProvider>
          </analytics.Provider>
        </RootSiblingParent>
      </ThemeProvider>
    </>
  );
});

export default App;
