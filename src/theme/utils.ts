import yargs from "yargs"
import { CLIArgs } from "./cli-args"

export function getWorkingDir(): string {
    const args = yargs.argv as CLIArgs
    return args.path ?? process.cwd()
}