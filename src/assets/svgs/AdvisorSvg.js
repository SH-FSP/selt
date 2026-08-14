import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Sizer from '../../helpers/Sizer';

function AdvisorSvg(props) {
  const size = props.width || Sizer.hSize(24);
  const height = props.height || Sizer.hSize(28);

  return props.active ? (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14.4a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4zm0-12a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zM4.8 27.2c0-3.978 3.223-7.2 7.2-7.2s7.2 3.222 7.2 7.2H4.8z"
        fill="#fff"
      />
      <Path
        d="M19.2 4.8l1.44 2.928 3.216.468-2.328 2.28.552 3.216L19.2 11.76l-2.88 1.512.552-3.216-2.328-2.28 3.216-.468L19.2 4.8z"
        fill="#D8A44A"
      />
    </Svg>
  ) : (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.5}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 14.4a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4zm0-12a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zM4.8 27.2c0-3.978 3.223-7.2 7.2-7.2s7.2 3.222 7.2 7.2H4.8z"
          fill="#fff"
        />
        <Path
          d="M19.2 4.8l1.44 2.928 3.216.468-2.328 2.28.552 3.216L19.2 11.76l-2.88 1.512.552-3.216-2.328-2.28 3.216-.468L19.2 4.8z"
          fill="#fff"
          opacity={0.6}
        />
      </G>
    </Svg>
  );
}

export default AdvisorSvg;
