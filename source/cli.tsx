#!/usr/bin/env node
import React from "react"
import { render } from "ink"
import meow from "meow"
import App from "./app.js"

export const cli = meow(
    `
    Usage
      $ commander-cli

    Examples
      $ commander-cli
`,
    {
        importMeta: import.meta,
    }
)

render(<App />)
