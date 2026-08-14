import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FavoriteSvg(props) {
  return (
    <Svg
      width={21}
      height={17}
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.535 2.326a5.062 5.062 0 00-1.622-.981A5.457 5.457 0 0014.999 1c-.657 0-1.307.117-1.914.345a5.062 5.062 0 00-1.622.981l-.963.872-.964-.872C8.598 1.477 7.326 1 6 1s-2.598.477-3.535 1.326c-.938.849-1.465 2-1.465 3.2 0 1.201.527 2.352 1.465 3.201l.963.872L10.5 16l7.071-6.4.964-.873c.464-.42.833-.92 1.084-1.468.252-.55.381-1.138.381-1.732 0-.595-.13-1.183-.38-1.733a4.524 4.524 0 00-1.085-1.468v0z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FavoriteSvg;
