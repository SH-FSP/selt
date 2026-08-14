import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function HomeHeaderLineSvg(props) {
  return (
    <Svg
      width={327}
      height={1}
      viewBox="0 0 327 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M0 .5h327" stroke="url(#paint0_linear_1_756)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_1_756"
          x1={0}
          y1={1}
          x2={327}
          y2={1}
          gradientUnits="userSpaceOnUse">
          <Stop offset={0.0865385} stopColor="#014220" />
          <Stop offset={0.523058} stopColor="#fff" />
          <Stop offset={0.908654} stopColor="#014220" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default HomeHeaderLineSvg;
