import React from "react"
import { Box } from "ink"
import "dotenv/config"
import { useAtomValue } from "jotai"
import CommandPreview from "./components/commandPreview.js"
import { aiResponseAtom } from "./atoms/aiResponseAtom.js"
import CommandQuery from "./components/commandQuery.js"
import { appKeyAtom } from "./atoms/resetAppAtom.js"

// TODO: Use the cli export to create a better manual
// import {cli} from './cli.js';

export default function App() {
    const aiResponse = useAtomValue(aiResponseAtom)
    const key = useAtomValue(appKeyAtom)

    return (
        <Box flexDirection="column" alignItems="flex-start" key={key}>
            <CommandQuery />

            {aiResponse && aiResponse.length > 0 && <CommandPreview />}
        </Box>
    )
}
