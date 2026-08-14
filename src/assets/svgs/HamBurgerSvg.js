import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function HamBurgerSvg(props) {
  return (
    <Svg
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_1_757)">
        <Path
          clipRule="evenodd"
          d="M22.792 38.583c9.826 0 17.791-7.965 17.791-17.791S32.618 3 22.792 3 5 10.966 5 20.792s7.966 17.791 17.792 17.791z"
          stroke="#fff"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 15.167c0-.645.504-1.167 1.125-1.167h15.75c.621 0 1.125.522 1.125 1.167 0 .644-.504 1.166-1.125 1.166h-15.75c-.621 0-1.125-.522-1.125-1.166zM14 21c0-.644.504-1.167 1.125-1.167h15.75c.621 0 1.125.523 1.125 1.167s-.504 1.167-1.125 1.167h-15.75C14.504 22.167 14 21.644 14 21zm0 5.833c0-.644.504-1.166 1.125-1.166h15.75c.621 0 1.125.522 1.125 1.166 0 .645-.504 1.167-1.125 1.167h-15.75C14.504 28 14 27.478 14 26.833z"
        fill="#fff"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default HamBurgerSvg;
