import path from 'path'
import fs from 'fs'
import readPkgUp from 'read-pkg-up'
import { IProject } from 'fox-types'
import * as c from 'colorette'
import mergeWith from 'lodash.mergewith'
import debug from './debug'

/**
 * @description get all necessary data from parent module
 */
export async function getProjectData(): Promise<IProject> {
	const obj = await readPkgUp({
		cwd: process.cwd(),
		normalize: false,
	})
	if (!obj) {
		console.error(
			c.bold(
				c.red(
					"we couldn't get the package.json of your project. exiting.",
				),
			),
		)
		process.exit(1)
	}
	const { packageJson: packageJson, path: packageJsonPath } = obj

	const location = path.dirname(packageJsonPath)
	const foxConfigPath = path.resolve(location, 'fox.config.js')

	const customizer = (
		destObj: Record<string, any>,
		srcObj: Record<string, any>,
	): any => {
		// for arrays that are not rules, merge them
		// 'extends', 'plugins', etc.
		if (
			Array.isArray(destObj) &&
			Array.isArray(srcObj) &&
			!destObj.includes('error') &&
			!srcObj.includes('error') &&
			!destObj.includes('off') &&
			!srcObj.includes('off')
		) {
			return destObj.concat(srcObj)
		}
	}

	let foxConfig
	try {
		await fs.promises.access(foxConfigPath, fs.constants.F_OK)
		foxConfig = (await import(foxConfigPath)).default

		// default foxConfig options
		const defaultFoxConfig = {
			all: 'cozy',
			monorepo: false,
			env: [],
			plugins: {}
		}

		foxConfig = mergeWith(defaultFoxConfig, foxConfig, customizer)
		debug('defaultFoxConfig: %o', defaultFoxConfig)
		debug('foxConfig: %o', foxConfig)
	} catch (err) {
		if (err.code === 'ENOENT' && err.syscall === 'access') {
			console.log(
				c.bold(
					c.red(
						"fox.config.js file missing. see details: https://github.com/eankeen/fox-suite#fox-suite"
					)
				)
			);
			process.exit(1)
		}

		console.error(err)
	}

	return {
		packageJson,
		packageJsonPath,
		foxConfig,
		foxConfigPath,
		location,
	}
}
