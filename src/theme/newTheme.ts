#! /usr/bin/env node
import process, { cwd } from "node:process";
import yargs from "yargs"
import { CLIArgs } from "./cli-args";
import { join, resolve } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { ThemeDef, generateSFTJson } from "./sft";
import Koa from 'koa'
import { EventEmitter, PassThrough } from 'node:stream';
import chokidar from "chokidar";
import { v4 } from "uuid";

process.env.SDK_PLUGINS_VER = require('../../package.json')['sdk-versions']['plugins']

const args = yargs.argv as CLIArgs
const workingDir = args.input ?? process.cwd()

const sessionUUID = v4()

const looseArgs = args._ as string[]

function getTheme(path: string) {
    const fileData = readFileSync(join(path, 'theme.json'), { encoding: 'utf-8' })
    const theme: any = JSON.parse(fileData)

    return theme
}

async function main() {
    console.log('Plugin API Version: ', process.env.SDK_PLUGINS_VER)


    if (looseArgs.includes('new')) {
        let path = looseArgs[looseArgs.indexOf('new') + 1] ?? cwd()
        if (!existsSync(path)) {
            mkdirSync(path)
        }

        const theme: ThemeDef = {
            author: 'Unknown',
            identifier: 'com.example.theme',
            name: 'New Theme',
            styles: [
                {
                    "name": "New Style",
                    "entry": "style.scss"
                },
            ]
        }

        // write theme.json to that folder
        writeFileSync(join(path, 'theme.json'), JSON.stringify(theme, null, 4))
        // write empty style.scss to that folder
        writeFileSync(join(path, 'style.scss'), '')

        console.log("Created new theme")

        process.exit(0)
    }


    if (looseArgs.includes('compile')) {
        performance.now()
        let path = looseArgs[looseArgs.indexOf('compile') + 1] ?? workingDir

        const theme = getTheme(path)
        if (!theme) {
            console.error("No theme.json found in working directory")
            process.exit(1)
        }
        console.log('Theme name: ', theme?.name ?? 'null')

        const sft = await generateSFTJson(theme, true, resolve(path))


        // check if dist exists
        if (!existsSync(join(path, 'dist'))) {
            mkdirSync(join(path, 'dist'))
        }

        writeFileSync(join(path, 'dist/theme.cider-theme'), JSON.stringify(sft))

        console.log("Compiled theme in ", +performance.now().toFixed(2), "ms")

        process.exit(0)
    }

    if (looseArgs.includes('serve')) {
        let path = looseArgs[looseArgs.indexOf('serve') + 1] ?? workingDir

        const resolvedPath = resolve(path)

        const theme = getTheme(path)
        if (!theme) {
            console.error("No theme.json found in working directory")
            process.exit(1)
        }
        console.log('Theme name: ', theme?.name ?? 'null')

        createServer({
            workingDir: resolvedPath
        })

        chokidar.watch(resolvedPath).on('change', async () => {
            const sft = await generateSFTJson(theme, false, resolvedPath)

            const res = {
                type: 'update',
                time: Date.now(),
                data: sft
            }

            events.emit('data', JSON.stringify(res))
        })
    }
}

function getServerPort() {
    if (args.port) return args.port
    return 4590
}

const events = new EventEmitter()
events.setMaxListeners(0)

interface CreateServerOptions {
    workingDir: string
}

function createServer(opts: Partial<CreateServerOptions>) {
    return new Koa().
        use(async (ctx, next) => {
            if (ctx.path !== "/sse") {
                return await next();
            }

            ctx.request.socket.setTimeout(0);
            ctx.req.socket.setNoDelay(true);
            ctx.req.socket.setKeepAlive(true);

            ctx.set({
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            });

            const stream = new PassThrough();

            ctx.status = 200;
            ctx.body = stream;

            const theme = getTheme(opts?.workingDir ?? workingDir)
            const sft = await generateSFTJson(theme, false, opts?.workingDir ?? workingDir)

            const res = {
                type: 'update',
                time: Date.now(),
                data: sft
            }

            const listener = (data: any) => {
                // write in base64
                stream.write(`data: ${btoa(data)}\n\n`);
            }

            events.on("data", listener);

            stream.on("close", () => {
                events.off("data", listener);
            });

            stream.write(`data: ${btoa(JSON.stringify(res))}\n\n`);
        })
        .use(ctx => {
            ctx.status = 200;
            ctx.body = "ok";
        }).listen(getServerPort(), () => console.log("Server started"))

}


main()