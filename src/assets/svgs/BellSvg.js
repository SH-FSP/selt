import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function BellSvg(props) {
  return (
    <Svg
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_1_760)">
        <Path
          clipRule="evenodd"
          d="M22.792 38.583c9.826 0 17.791-7.965 17.791-17.791S32.618 3 22.792 3 5 10.966 5 20.792s7.966 17.791 17.792 17.791z"
          stroke="#fff"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.952 12.819c-1.44 0-2.82.574-3.838 1.597a5.469 5.469 0 00-1.59 3.858v4.546c0 .644-.17 1.27-.485 1.819h11.827a3.651 3.651 0 01-.485-1.819v-4.546a5.47 5.47 0 00-1.59-3.858 5.415 5.415 0 00-3.839-1.598zM32 24.639c-.48 0-.94-.192-1.28-.533a1.823 1.823 0 01-.53-1.286v-4.546c0-1.93-.762-3.78-2.12-5.144A7.22 7.22 0 0022.953 11a7.22 7.22 0 00-5.118 2.13 7.292 7.292 0 00-2.12 5.144v4.546c0 .482-.19.945-.53 1.286-.34.341-.8.533-1.28.533-.499 0-.904.407-.904.909s.405.909.905.909H32v-1.818zm-11.067 3.76a.902.902 0 011.237.33.907.907 0 00.782.453.902.902 0 00.783-.453.902.902 0 011.237-.33c.432.251.579.808.328 1.242a2.704 2.704 0 01-4.696 0 .912.912 0 01.33-1.243z"
        fill="#fff"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default BellSvg;
