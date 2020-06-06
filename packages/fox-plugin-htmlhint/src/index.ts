import path from 'path'
import fs from 'fs'
// import htmlhint from 'htmlhint'
import type { IFoxConfig } from "fox-types";
import * as foxUtils from "fox-utils";
import glob from 'glob'
import util from 'util'
import { HTMLHint } from 'htmlhint'
import * as c from 'colorette'


export { info } from './info'

export async function bootstrapFunction(): Promise<void> {
	await foxUtils.buildBootstrap({
		dirname: __dirname
	})
}

export async function fixFunction(): Promise<void> {
	await foxUtils.buildFix({
		dirname: __dirname,
		async fn() {
			const projectData = await foxUtils.getProjectData()
			const htmlFiles = await util.promisify(glob)(`${projectData.location}/**/*.html`)

			for (const htmlFile of htmlFiles) {
				const htmlFileContent = await fs.promises.readFile(htmlFile, { encoding: 'utf8' })

				const results = HTMLHint.verify(htmlFileContent, {})

				for (const result of results) {
					console.info(c.bold(c.red(`${htmlFile}:${result.line}:${result.col}`)))
					console.info(result.message)
					// @ts-ignore
					console.info(result.raw)
					console.info(result.rule)
					console.info()
				}
			}
		}
	})
}
