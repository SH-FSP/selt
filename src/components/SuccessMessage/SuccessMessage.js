import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
//--------
import { Flex, Typography } from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import { COLORS } from '../../globalStyle/Theme';
import Button from '../customButtons/Button';
import { verified } from '../../assets/images';

const SuccessMessage = ({
  image = '',
  // image = verified,
  title = 'Success!',
  message = 'Your action was successful.',
  buttonLabel = 'Go Back',
  onPress = () => { },
}) => {
  const navigation = useNavigation();

  return (
    <Flex
      gap={22}
      direction={'column'}
      algItems={'center'}
      jusContent={'center'}>
      <Image source={verified} style={styles.image} resizeMode="contain" />
      <Typography
        size={28}
        adjustsFontSizeToFit
        numberOfLines={1}
        fFamily="interTightSemiBold600">
        {title}
      </Typography>
      <Typography
        size={16}
        LineHeight={22}
        textAlign="center">
        {message}
      </Typography>
      <Button
        label={buttonLabel}
        btnStyle={{ width: '100%' }}
        onPress={onPress || (() => navigation.goBack())}
      />
    </Flex>
  );
};

export default SuccessMessage;

const styles = StyleSheet.create({
  image: {
    width: Sizer.vSize(163),
    height: Sizer.vSize(163),
  },
});
