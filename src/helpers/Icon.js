import React, { memo } from 'react';
import IconFM from '@react-native-vector-icons/fontawesome';
import IconFN from '@react-native-vector-icons/fontisto';
import IconFD from '@react-native-vector-icons/foundation';
import IconN from '@react-native-vector-icons/ionicons';
import IconMI from '@react-native-vector-icons/material-icons';
import IconMD from '@react-native-vector-icons/material-design-icons';
import IconOc from '@react-native-vector-icons/octicons';
import IconZc from '@react-native-vector-icons/zocial';
import IconEn from '@react-native-vector-icons/entypo';
import IconAn from '@react-native-vector-icons/ant-design';
import IconFE from '@react-native-vector-icons/feather';
import IconSI from '@react-native-vector-icons/simple-line-icons';
import IconFM5 from '@react-native-vector-icons/fontawesome5';
import IconFMB from '@react-native-vector-icons/fontawesome5-pro';
import IconFM6 from '@react-native-vector-icons/fontawesome6';

// creating a dynamic VectorIcon component for Icons

const Icon = ({ name, iconFamily, size, color, style }) => {
  switch (iconFamily) {
    case 'FontAwesome':
      return <IconFM name={name} size={size} color={color} style={style} />;
    case 'Fontisto':
      return <IconFN name={name} size={size} color={color} style={style} />;
    case 'Foundation':
      return <IconFD name={name} size={size} color={color} style={style} />;
    case 'Ionicons':
      return <IconN name={name} size={size} color={color} style={style} />;
    case 'MaterialCommunityIcons':
      return <IconMD name={name} size={size} color={color} style={style} />;
    case 'MaterialIcons':
      return <IconMI name={name} size={size} color={color} style={style} />;
    case 'Octicons':
      return <IconOc name={name} size={size} color={color} style={style} />;
    case 'Zocial':
      return <IconZc name={name} size={size} color={color} style={style} />;
    case 'Entypo':
      return <IconEn name={name} size={size} color={color} style={style} />;
    case 'AntDesign':
      return <IconAn name={name} size={size} color={color} style={style} />;
    case 'Feather':
      return <IconFE name={name} size={size} color={color} style={style} />;
    case 'SimpleLineIcons':
      return <IconSI name={name} size={size} color={color} style={style} />;
    case 'FontAwesome5':
      return <IconFM5 name={name} size={size} color={color} style={style} />;
    case 'FontAwesome5Brands':
      return <IconFMB name={name} size={size} color={color} style={style} />;
    case 'FontAwesome6':
      return <IconFM6 name={name} size={size} color={color} style={style} />;

    default:
      return <IconFM name={name} size={size} color={color} style={style} />;
  }
};

export default memo(Icon);
