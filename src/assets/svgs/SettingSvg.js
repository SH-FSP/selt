import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SettingSvg(props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.727 11.727v5.977a.797.797 0 01-.795.796h-.864a.797.797 0 01-.796-.796v-5.977h2.455zm6.977-3.455c.44 0 .796.357.796.796v.864a.797.797 0 01-.796.795h-5.977V8.272h5.977zm-16.408 0h5.976v2.455H1.296A.797.797 0 01.5 9.932v-.864c0-.439.357-.796.796-.796zm9.431 0v2.455H8.272V8.272h2.455zM9.068.5h.864c.439 0 .795.357.795.796v5.976H8.272V1.296c0-.44.357-.796.796-.796z"
        stroke="#fff"
      />
    </Svg>
  );
}

export default SettingSvg;
