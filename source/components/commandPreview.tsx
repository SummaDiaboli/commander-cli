import { Box, Text } from "ink"
import { useAtomValue } from "jotai"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { aiResponseAtom } from "../atoms/aiResponseAtom.js"
import { highlight } from "cli-highlight"
import ConfirmInput from "./confirmInput.js"
import Clipboard from "./clipboard.js"
import { useResetAtom } from "jotai/utils"
import { appKeyAtom } from "../atoms/resetAppAtom.js"
import { useSetAtom } from "jotai"

enum Answer {
    YES = 0,
    NO = 1,
}

const CommandPreview: FC = () => {
    const command = useAtomValue(aiResponseAtom)
    const resetResponse = useResetAtom(aiResponseAtom)
    const setAppKey = useSetAtom(appKeyAtom)
    const highlightedCommand = useMemo(() => {
        return highlight(command)
    }, [command])
    const [value, setValue] = useState("")
    const [answer, setAnswer] = useState<Answer>(null)

    const handleSubmit = useCallback(
        (value: boolean) => {
            if (value === false) {
                setAnswer(Answer.NO)
                return
            }
            setAnswer(Answer.YES)
        },
        [setAnswer]
    )

    useEffect(() => {
        if (answer === Answer.NO) {
            setAnswer(null)
            resetResponse()
            setAppKey(Date.now())
        }
    }, [answer])

    return (
        <Box>
            <Box flexDirection="column">
                <Box flexDirection="row">
                    <Box marginRight={1} flexDirection="row">
                        <Text color={"yellow"}>
                            Run: <Text>{highlightedCommand}</Text>
                        </Text>
                    </Box>
                    <ConfirmInput
                        isChecked
                        onChange={setValue}
                        onSubmit={handleSubmit}
                        placeholder={"Y"}
                        value={value}
                        focus={answer === null}
                    />
                </Box>

                {answer === Answer.YES && <Clipboard />}
            </Box>
        </Box>
    )
}

export default CommandPreview
