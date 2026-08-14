import {View, TouchableOpacity, Text} from 'react-native';
import {Typography} from '../atomComponents';
import {COLORS} from '../globalStyle/Theme';
import Sizer from '../helpers/Sizer';

export function MyTabBar({state, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              padding: 10,
              alignItems: 'center',
              marginTop: Sizer.vSize(24),
            }}>
            <Typography
              fFamily={isFocused ? 'poppinsSemiBold600' : 'poppinsRegular400'}
              color={COLORS.primary}
              size={16}
              mB={12}>
              {route.name}
            </Typography>
            <View
              style={{
                height: Sizer.vSize(isFocused ? 3 : null),
                backgroundColor: COLORS.primary,
                width: '90%',
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
