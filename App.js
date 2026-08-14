import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import {Provider as ReduxProvider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';

import RootStack from './src/navigation/RootStack';
import {COLORS} from './src/globalStyle/Theme';
import {queryClient} from './src/api/api';
import store from './src/redux/store/store';
import {STRIPE_PUBLISHABLE_KEY} from './src/constants';


export default function App() {
  const Theme = {
    ...DefaultTheme,
    myOwnProperty: true, // Fo Custom Keys
    colors: {
      ...DefaultTheme.colors,
      ...COLORS,
    },
  };


  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={Theme}>
        <SafeAreaProvider>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
              <RootStack />
            </QueryClientProvider>
          </StripeProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
