import { Image } from 'react-native';
import { Flex, Typography } from '../../atomComponents';
import Sizer from '../../helpers/Sizer';
import { COLORS } from '../../globalStyle/Theme';

export const SubTitle = ({
  mTitle = 'NA',
  sTitle,
  img = '',
  onSeeAllPress,
  isSeeAllTextVisible = false,
  mB = 0
}) => {
  return (
    <Flex jusContent={'space-between'} mT={30} algItems={'center'} mB={mB}>
      <Flex algItems={'center'}>
        <Typography
          size={22}
          color={COLORS.black200}
          fFamily={'poppinsSemiBold600'}>
          {mTitle}{' '}
        </Typography>
      </Flex>
      {isSeeAllTextVisible && (
        <Typography
          size={18}
          color={COLORS.primary}
          fFamily={'poppinsSemiBold600'}
          onPress={onSeeAllPress}>
          See All
        </Typography>
      )}
    </Flex>
  );
};
