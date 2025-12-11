import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GlobalStateProvider } from './context/GlobalState';
import i18n from './i18n'; // Initialize i18n
import { I18nextProvider } from 'react-i18next';

export const metadata = {
  title: 'RemoteWork - Find Remote Jobs Worldwide',
  description: 'Discover remote job opportunities across industries. Search, filter, and apply to remote positions from top companies.',
  keywords: 'remote jobs, work from home, freelance, telecommute, job search',
  openGraph: {
    title: 'RemoteWork - Remote Job Search',
    description: 'Find your next remote job with RemoteWork.',
    images: [{ url: '/assets/images/icon.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteWork - Remote Job Search',
    description: 'Find your next remote job with RemoteWork.',
    images: ['/assets/images/icon.png'],
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom theme matching your app's color scheme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4effa1',
    secondary: '#2196f3',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    error: '#f44336',
    onPrimary: '#000000',
    onSecondary: '#ffffff',
    onBackground: '#000000',
    onSurface: '#000000',
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <GlobalStateProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </GlobalStateProvider>
      </PaperProvider>
    </I18nextProvider>
  );
}
