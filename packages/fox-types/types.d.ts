import { PackageJson } from 'type-fest';
import type { Stats } from 'fs';
type option = 'off' | 'cozy' | 'strict' | 'excessive';

/**
 * @description format of the `fox.config.js` file
 */
export interface IFoxConfig {
	all: option;
	monorepo: boolean;
	env: 'browser' | 'node' | 'deno' | 'browser-node' | 'browser-deno';
	plugin: Record<string, option>;
}

/**
 * @description used when building a cli
 */
export interface IBuildCli {
	pluginName: string;
	pluginDescription: string;
	bootstrapFunction?: () => Promise<void>;
	fixFunction: (fox: IFoxConfig) => Promise<void>;
}

/**
 * @description used when building a bootstrap
 */
export interface IBuildBootstrap {
	/**
	 * @description the current directory. note that this gets passed to `read-pkg-up`,
	 * so as long as the dirname is at or under where `package.json` is at,
	 * it will be valid
	 */
	dirname: string;
}

/**
 * @description used when building a lint
 */
export interface IBuildFix {
	/**
	 * @description the current directory. note that this gets passed to `read-pkg-up`,
	 * so as long as the dirname is at or under where `package.json` is at,
	 * it will be valid
	 */
	dirname: string;

	/**
	 * @description the actual linting function that is executed
	 * @summary you have to pass this function into the object (rather than just
	 * having it be inside `lintFunction()` is because we perform extra checks) before your functin
	 * is ran. for example, we check to make sure _all_ the necessary config files for your tool exist
	 * before invoking the tool
	 */
	fn: () => Promise<void>;
}

/**
 * @description used when dealing with user projects (the actual
 * project this tool gets installed to)
 */
export interface IProject {
	/**
	 * @description the actual object representing the `package.json` file of the fox plugin
	 * @example
	 * ```
	 * {
	 *   "name": "my-react-app"
	 *    ...
	 * }
	 * ```
	 */
	packageJson: PackageJson;

	/**
	 * @description absolute path to location of project's json file
	 * @example `/abs/my-react-app/package.json`
	 */
	packageJsonPath: string;

	/**
	 * @description the actual evaluated `fox.config.js` file of your project
	 * @example
	 * ```
	 * {
	 *   all: 'cozy'
	 *   plugins: {
	 *     stylelint: 'excessive'
	 *   }
	 *   ...
	 * }
	 * ```
	 */
	foxConfig: IFoxConfig;

	/**
	 * @description absolute path of the project's `fox.config.js`
	 * @example `/abs/my-react-app/fox.config.js`
	 */
	foxConfigPath: string;

	/**
	 * @description absolute path of the project root
	 * @example `/abs/my-react-app`
	 */
	location: string;
}

/**
 * @private
 */
export interface ITemplateFile {
	absolutePath: string;
	relativePath: string;
	stats: Stats;
}

/**
 * @private
 * @description this is when dealing with plugins
 */
export interface IPlugin {
	/**
	 * @description absolute path of template directory
	 * @example `/abs/fox-plugin-stylelint/templates`
	 */
	templateDir: string;

	/**
	 * @description absolute path of files that need to be templated, and
	 * copied over to the user's project (the project using fox-suite)
	 * @example
	 * ```
	 * [
	 * 	 /abs/fox-plugin-stylelint/templates/.config/stylelint.config.js,
	 *   /abs/fox-plugin-stylelint/templates/.config/stylelintignore
	 * ]
	 * ```
	 */
	templateFiles: ITemplateFile[];

	/**
	 * @description the absolute path of the plugin root
	 * @example `/abs/fox-plugin-stylelint`
	 */
	pluginRoot: string;

	/**
	 * @description the actual object representing the `package.json` file of the fox plugin
	 * @example
	 * ```
	 * {
	 *   "name": "fox-plugin-stylelint"
	 *    ...
	 * }
	 * ```
	 */
	packageJson: PackageJson;
}

/**
 * @description found in a preset's `index.js` file
 */
export interface IPresetExportIndex {
	plugins: string[];
}

/**
 * @description found in a plugin's `src/index.ts` file
 */
export interface IPluginExportIndex {
	/**
	 * the plugin's exported `info` object
	 */
	info: IPluginExportInfo;

	/**
	 * @description the function that is executed when the user wants your
	 * project's tooling to be 'bootstrapped'
	 */
	bootstrapFunction?: () => Promise<void>;

	/**
	 * @description the function that does the thing that your
	 * plugin says it does
	 */
	fixFunction?: (fox: IFoxConfig) => Promise<void>;
}

/**
 * @description found in a plugin's `src/info.ts` file
 */
export interface IPluginExportInfo {
	/**
	 * @description literally the name of your project. _must_ be the same as
	 * in your `package.json`
	 */
	name: string;

	/**
	 * @description name of the tool that is being abstracted over. _important_, this will be
	 * the property of an object, so just use alphanumerics. more specifically, this will be your
	 * key in `fox.config.js` (under foxConfig.plugins[tool])
	 * @example this would be `Stylelint` for `fox-plugin-stylelint`
	 * @todo ensure there is a `fox-test-runner` test (read desc) for that case
	 */
	tool: string;

	/**
	 * @description name of the tool that is being abstracted over. note that this text
	 * will be shown to the user, so having correct casing will make things look better
	 * @example this would be `stylelint` for `fox-plugin-stylelint`
	 */
	toolName: string;

	/**
	 * @description website url that shows more information about
	 * the tool's configuration format
	 * @example for `fox-plugin-stylelint`, you may want to link to the documentation
	 * that shows all the rules that can be placed in the `stylelint.config.js` file
	 */
	toolConfigSchemaHelpUri: string;

	/**
	 * @description description of your plugin. what tool does it abstract over
	 */
	description: string;

	/**
	 * an extended description. you probably want to include more details here,
	 * like caveats with the plugin
	 */
	descriptionLong: string;
}

/**
 * @description basically a single unit that has information
 * about the stuff we want to do to a specific project
 * @todo make this only an array and handle that
 */
interface IActionBootstrap {
	actionFunctions:
		| IPluginExportIndex['bootstrapFunction']
		| IPluginExportIndex['bootstrapFunction'][];
	projectData: IProject;
}

interface IActionFix {
	actionFunctions:
		| IPluginExportIndex['fixFunction']
		| IPluginExportIndex['fixFunction'][];
	projectData: IProject;
}

export type IAction = IActionBootstrap | IActionFix;
