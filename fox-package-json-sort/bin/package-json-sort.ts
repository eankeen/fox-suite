#!/usr/bin/env node

import minimist from 'minimist'
// @ts-ignore
import * as foxUtils from 'fox-utils'

import { sortPackageJsonFileAuto } from '../src'

const argv = minimist(process.argv.slice(2))

if (argv.help || argv.h) {
  console.log(`fox-util-sort-package-json

Usage:
  sort-package-json

Description:
  Sorts the package.json of the current project

Options:
  --help  show help
  -h      show help

Examples:
  sort-package-json --help
  sort-package-json`)

  process.exitCode = 0
}

;(async () => {
  const resultObj = await sortPackageJsonFileAuto()
  foxUtils.printSuccess(`sorted packageJson at ${resultObj.projectPackageJsonPath}`)
})()