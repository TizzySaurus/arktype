import path from "node:path"
import { fileURLToPath } from "node:url"
import { isDeepStrictEqual } from "node:util"
import getCurrentLine, { getFramesFromError } from "get-current-line"

export type GetCallStackOptions = {
    offset?: number
}

export const getCallStack = ({ offset = 0 }: GetCallStackOptions = {}) => {
    const frames = getFramesFromError(new Error())
    frames.splice(1, 1 + offset)
    return frames
}

export interface LinePosition {
    line: number
    char: number
}

export interface SourcePosition extends LinePosition {
    file: string
    method: string
}

export type CallerOfOptions = {
    formatPath?: FormatFilePathOptions
    upStackBy?: number
    skip?: (position: SourcePosition) => boolean
    methodName?: string
}

const nonexistentCurrentLine = {
    line: -1,
    char: -1,
    method: "",
    file: ""
}

export type FormatFilePathOptions = {
    relative?: string | boolean
    seperator?: string
}

export const formatFilePath = (
    original: string,
    { relative, seperator }: FormatFilePathOptions
) => {
    let formatted = original
    if (original.startsWith("file:///")) {
        formatted = fileURLToPath(original)
    }
    if (relative) {
        formatted = path.relative(
            typeof relative === "string" ? relative : process.cwd(),
            formatted
        )
    }
    if (seperator) {
        formatted = formatted.replace(
            new RegExp(`\\${path.sep}`, "g"),
            seperator
        )
    }
    return formatted
}

export const caller = (options: CallerOfOptions = {}): SourcePosition => {
    let upStackBy = options.upStackBy ?? 0
    if (!options.methodName) {
        upStackBy = 3
    }
    let match: SourcePosition | undefined
    while (!match) {
        const location = getCurrentLine({
            method: options.methodName,
            frames: upStackBy
        })
        if (!location || isDeepStrictEqual(location, nonexistentCurrentLine)) {
            throw new Error(
                `No caller of '${
                    options.methodName
                }' matches given options: ${JSON.stringify(options, null, 4)}.`
            )
        }
        const candidate = {
            ...location,
            file: formatFilePath(location.file, options.formatPath ?? {})
        }
        if (options.skip?.(candidate)) {
            upStackBy++
        } else {
            match = candidate
        }
    }
    return match
}

export const callsAgo = (
    num: number,
    options: Omit<CallerOfOptions, "upStackBy"> = {}
) => caller({ methodName: "callsAgo", upStackBy: num, ...options })