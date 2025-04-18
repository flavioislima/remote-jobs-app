import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the tabs layout, which will show the main "index" tab by default
  return <Redirect href="/(tabs)" />;
}
