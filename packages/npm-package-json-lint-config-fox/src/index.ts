import { IFoxConfig } from 'fox-types'

const foxConfig: IFoxConfig = JSON.parse(
	process.env.FOX_SUITE_FOX_OPTIONS || '{}',
)
const tier: string = process.env.FOX_SUITE_PLUGIN_STYLELINT_TIER || ''

const npmPackageJsonLintConfig = {
	rules: {
		'require-name': 'error',
		'require-version': 'error',
		'name-format': 'error',
		'version-format': 'error',
		'bin-type': 'error',
		'config-type': 'error',
		'cpu-type': 'error',
		'dependencies-type': 'error',
		'description-type': 'error',
		'devDependencies-type': 'error',
		'directories-type': 'error',
		'engines-type': 'error',
		'files-type': 'error',
		'homepage-type': 'error',
		'keywords-type': 'error',
		'license-type': 'error',
		'main-type': 'error',
		'man-type': 'error',
		'name-type': 'error',
		'optionalDependencies-type': 'error',
		'os-type': 'error',
		'peerDependencies-type': 'error',
		'preferGlobal-type': 'error',
		'private-type': 'error',
		'repository-type': 'error',
		'scripts-type': 'error',
		'version-type': 'error',
	},
}

export default npmPackageJsonLintConfig
