import React from 'react';
import { Typography } from '../../atomComponents';
import { COLORS } from '../../globalStyle/Theme';

const InputLabel = ({ title = '', ...props }) => {
  return (
    <Typography
      mT={20}
      mB={12}
      size={15}
      fFamily="poppinsMedium500"
      color={COLORS.primary}
      {...props}>
      {title}
    </Typography>
  );
};

export default InputLabel;
