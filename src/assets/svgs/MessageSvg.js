import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MessageSvg(props) {
  return (
    <Svg
      width={19}
      height={14}
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.5 12.444c0 .574-.478 1.056-1.083 1.056H1.583A1.071 1.071 0 01.5 12.444V2.892c2.867 2.388 6.43 5.37 7.563 6.373v0c.842.747 2.03.745 2.872 0h.002c1.201-1.063 5.176-4.385 7.563-6.373v9.552zM1.583.5h15.834c.295 0 .57.117.775.326-2.287 1.903-6.004 5.006-7.8 6.549l-.648.563v.001c-.11.097-.19.116-.244.116a.3.3 0 01-.167-.056l-.075-.059-.65-.564C6.813 5.832 3.094 2.729.807.826c.176-.18.405-.291.653-.32L1.583.5z"
        stroke="#fff"
      />
    </Svg>
  )
}

export default MessageSvg
