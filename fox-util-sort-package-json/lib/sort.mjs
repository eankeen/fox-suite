import fs from 'fs'
import assert from 'assert'

import {
  ensureUnecognizedKeys,
  findParentPackageJson,
  processGroup
} from './util.mjs'
import {
  isString,
  isObject,
  isArray
} from './is.mjs'
import {
  groupTopLevel,
  groupScriptsAndConfig,
  groupExternalPackageConfig,
  groupNpmPackageMeta,
  groupJsEntryPoints,
  groupMiscFile,
  groupEnginesOsCpu,
  groupVsCodeExtensionMeta,
  groupDependencyTypes
} from './groupCategories.mjs'

/**
 * terminology
 *
 * a 'group' is a collection of keys that we want to be
 * sorted alphebetically relative to each other. this library
 * only actually sorts groups relative to each other
 *
 * a 'surface' is a platform where sorting occurs. aka
 * an object we add members to. members can be root keys to
 * package.json or members of a nested object in package.json (ex. "eslint": {})
 * usually we create a surface, then add members, and lastly, sort the members
 * within that surface
 */


 /**
  * @description finds the closes parent package.json file and sorts it
  */
export async function sortPackageJsonFileAuto() {
  const packageJsonFile = await findParentPackageJson()
  await sortPackageJsonFile(packageJsonFile)
}


/**
 * @description sorts a particular package.json file
 * @param {string} packageJsonFile - package.json file to sort. must be an absolute path
 */
export async function sortPackageJsonFile(packageJsonFile) {
  if(!fs.existsSync(packageJsonFile)) {
    throw new Error(`packageJsonFile '${packageJsonFile}' does not exist`)
  }

  const packageJson = JSON.parse(await fs.promises.readFile(packageJsonFile))
  const sortedPackageJson = sortPackageJson(packageJson)
  await fs.promises.writeFile(packageJsonFile, JSON.stringify(sortedPackageJson, null, 2))
}


/**
 * @description sorts an object that represents a package.json file
 * @param {object} input - object to sort
 * @return {object} the sorted object
 */
export function sortPackageJson(input) {
  const groupRoot = {
    groupTopLevel,
    groupScriptsAndConfig,
    groupExternalPackageConfig,
    groupNpmPackageMeta,
    groupJsEntryPoints,
    groupMiscFile,
    groupEnginesOsCpu,
    groupVsCodeExtensionMeta,
    groupDependencyTypes
  }

  let output = {}
  for (const groupName in groupRoot) {
    const group = groupRoot[groupName]

    assert(isObject(group), "groups must be an object")
    assert(isString(group.location), "groups must have a 'location' property of type stirng")
    assert(isArray(group.keys), "groups must have a 'keys' property that's an array")

    const surface = processGroup(input, group)

    output = {
      ...output,
      ...surface
    }
  }

  return ensureUnecognizedKeys(input, output)
}

process.on('uncaughtException', (err) => console.error(err))
process.on('unhandledRejection', (err) => console.error(err))
