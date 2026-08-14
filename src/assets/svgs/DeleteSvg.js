import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { COLORS } from "../../globalStyle/Theme"

function DeleteSvg(props) {
    return (
        <Svg
            width={16}
            height={19}
            viewBox="0 0 16 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M3 19c-.55 0-1.02-.206-1.412-.62A2.095 2.095 0 011 16.89V3.167H0V1.056h5V0h6v1.056h5v2.11h-1V16.89c0 .58-.196 1.078-.587 1.491-.391.414-.862.62-1.413.62H3zM13 3.167H3v13.722h10V3.167zm-8 11.61h2v-9.5H5v9.5zm4 0h2v-9.5H9v9.5z"
                fill={COLORS.red}
            />
        </Svg>
    )
}

export default DeleteSvg
