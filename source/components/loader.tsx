import { Text } from "ink"
import React from "react"
import Spinner from "ink-spinner"

const Loader = () => {
    return (
        <Text color={"cyan"}>
            <Text color={"cyan"}>
                <Spinner type="dots3" />
            </Text>
            {" Loading..."}
        </Text>
    )
}

export default Loader
