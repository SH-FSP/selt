import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ResidentialSvg(props) {
  return (
    <Svg
      width={40}
      height={37}
      viewBox="0 0 40 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M29.474 12.495L20 2.981 5.074 17.971H8.42v16.915h6.316V22.2h10.526v12.686h6.316V17.97h3.347L31.58 14.61V7.4h-2.105v5.095zM0 20.085L20 0l7.368 7.4V5.286h6.316v8.457L40 20.086h-6.316V37H23.158V24.314h-6.316V37H6.316V20.086H0z"
        fill="#014220"
      />
    </Svg>
  )
}

export default ResidentialSvg
