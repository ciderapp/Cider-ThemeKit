import {Result} from 'postcss'
import { StyleDef } from './sft'

export function buildCSS(options: buildCSSOptions): Promise<Result>
export interface buildCSSOptions {
    inlineAssets: boolean
    workingDir: string
    writeResults?: boolean
    styleDef: StyleDef
}