import * as foxUtils from 'fox-utils'
import { fixFunction } from '../src'
import { info } from './info'

export async function cli() {
	await foxUtils.buildCli(process.argv, {
		pluginName: info.name,
		pluginDescription: info.description,
		fixFunction: fixFunction,
	});
}
