import path from 'path'
import fs from 'fs'
import test from 'ava'

import { sortPackageJson } from '../lib/sort.mjs'
import { groupExternalPackageConfig } from '../lib/groupCategories.mjs'

const testPackageJsons = fs.readdirSync(path.join(__dirname, './fixtures'))
  .filter(fileName => fileName.includes('package.json') && !fileName.includes('fmt'))
  .map(fileName => fileName.slice(0, fileName.indexOf('.')))

for (const testPackageJson of testPackageJsons) {
  test(`ensure ${testPackageJson}.package.json is ordered properly`, async t => {
    const packageJsonLocation = path.join(__dirname, `./fixtures/${testPackageJson}.package.json`)
    const correctPackageJsonLocation = path.join(__dirname, `./fixtures/${testPackageJson}.fmt.package.json`)

    const packageJsonRaw = await fs.promises.readFile(packageJsonLocation)
    const correctPackageJsonRaw = await fs.promises.readFile(correctPackageJsonLocation)

    const packageJson = JSON.parse(packageJsonRaw)
    const correctPackageJson = JSON.parse(correctPackageJsonRaw)

    const output = sortPackageJson(packageJson)
    // ensure all the same properties exist on object
    t.deepEqual(correctPackageJson, output)

    // ensure properties have correct ordering
    t.deepEqual(Object.keys(correctPackageJson), Object.keys(output))
  })
}

test('ensure externalPackageConfig is sorted alphabetically', t => {
  const externalPackages = groupExternalPackageConfig.keys
  const sortedExternalPackages = groupExternalPackageConfig.keys.sort()

  t.deepEqual(externalPackages, sortedExternalPackages)
})
