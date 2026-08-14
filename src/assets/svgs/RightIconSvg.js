import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
import Sizer from '../../helpers/Sizer';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function RightIconSvg(props) {
  return (
    <Svg
      width={props.width || Sizer.hSize(36)}
      height={props.height || Sizer.hSize(36)}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_134_207)">
        <Path
          clipRule="evenodd"
          d="M17.792 28.583c7.064 0 12.791-5.727 12.791-12.791C30.583 8.727 24.856 3 17.792 3 10.727 3 5 8.727 5 15.792c0 7.064 5.727 12.791 12.792 12.791z"
          stroke="#014220"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.753 23.435l6.364-6.364a1 1 0 000-1.414l-6.364-6.364a1 1 0 10-1.414 1.414l4.657 4.657H12v2h8.996l-4.657 4.657a1 1 0 101.414 1.414z"
        fill="#014220"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default RightIconSvg;
