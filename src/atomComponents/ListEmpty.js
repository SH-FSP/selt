import React from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
//-----
import Typography from './Typography';
import Sizer from '../helpers/Sizer';
import {COLORS, WINDOW} from '../globalStyle/Theme';

const ListEmpty = ({
  type = '',
  isLoading = false,
  height = undefined,
  vector = null,
}) => {
  return (
    <View
      style={{
        height: Sizer.hSize(height),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator size={20} color={COLORS.primary} />
      ) : (
        <>
          {vector && (
            <Image
              source={vector}
              style={{height: Sizer.hSize(300), width: Sizer.hSize(300)}}
              resizeMode="contain"
            />
          )}

          <Typography
            size={12}
            mT={12}
            fFamily="bold"
            textAlign="center"
            color={COLORS.blueV1}>
            {type}
          </Typography>
        </>
      )}
    </View>
  );
};

export default React.memo(ListEmpty);
