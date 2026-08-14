import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import Sizer from '../../helpers/Sizer';

function ProfileSvg(props) {
  return (
    <>
      {props.active ? (
        <Svg
          width={props.width || Sizer.hSize(24)}
          height={props.height || Sizer.hSize(28)}
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.984 27.2c-.623 0-1.128-.532-1.128-1.188 0-4.652-3.594-8.436-8.01-8.436h-1.692c-4.416 0-8.01 3.784-8.01 8.436 0 .656-.505 1.188-1.128 1.188-.623 0-1.128-.532-1.128-1.188C.888 20.05 5.493 15.2 11.154 15.2h1.692c5.66 0 10.266 4.85 10.266 10.812 0 .656-.505 1.188-1.128 1.188zM11.617 14.4c-3.803 0-6.897-3.23-6.897-7.2S7.814 0 11.617 0c3.803 0 6.897 3.23 6.897 7.2s-3.094 7.2-6.897 7.2zm0-12c-2.536 0-4.598 2.153-4.598 4.8S9.08 12 11.617 12c2.535 0 4.598-2.153 4.598-4.8s-2.063-4.8-4.598-4.8z"
            fill="#fff"
          />
        </Svg>
      ) : (
        <Svg
          width={props.width || Sizer.hSize(24)}
          height={props.height || Sizer.hSize(28)}
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <G opacity={0.5} fillRule="evenodd" clipRule="evenodd" fill="#fff">
            <Path d="M21.984 27.2c-.623 0-1.128-.532-1.128-1.188 0-4.652-3.594-8.436-8.01-8.436h-1.692c-4.417 0-8.01 3.784-8.01 8.436 0 .656-.505 1.188-1.128 1.188-.623 0-1.128-.532-1.128-1.188C.888 20.05 5.493 15.2 11.154 15.2h1.692c5.66 0 10.266 4.85 10.266 10.812 0 .656-.505 1.188-1.128 1.188zM11.617 14.4c-3.803 0-6.897-3.23-6.897-7.2S7.814 0 11.617 0c3.803 0 6.897 3.23 6.897 7.2s-3.094 7.2-6.897 7.2zm0-12c-2.536 0-4.598 2.153-4.598 4.8S9.08 12 11.617 12c2.535 0 4.598-2.153 4.598-4.8s-2.063-4.8-4.598-4.8z" />
          </G>
        </Svg>
      )}
    </>
  );
}

export default ProfileSvg;
