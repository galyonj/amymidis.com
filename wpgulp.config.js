/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package WPGulp
 */

module.exports = {

	// Project options.
	projectURL: 'amymidis.test', // Local project URL of your already running WordPress site. Could be something like wpgulp.local or localhost:3000 depending upon your local WordPress setup.
	productURL: './', // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.
	browserAutoOpen: false,
	injectChanges: true,

	// Style options.
	styleSRC: './dev/css/*.scss', // Path to main .scss file.
	styleDestination: './site/web/app/themes/amymidis.com/assets/css', // Path to place the compiled CSS file. Default set to root folder.
	outputStyle: 'compact', // Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
	errLogToConsole: true,
	precision: 10,

	// JS Vendor options.
	jsVendorSRC: './dev/js/vendor/*.js', // Path to JS vendor folder.
	jsVendorDestination: './site/web/app/themes/amymidis.com/assets/js', // Path to place the compiled JS vendors file.
	jsVendorFile: 'vendor', // Compiled JS vendors file name. Default set to vendors i.e. vendors.js.

	// JS Custom options.
	jsCustomSRC: './dev/js/*.js', // Path to JS custom scripts folder.
	jsCustomDestination: './site/web/app/themes/amymidis.com/assets/js', // Path to place the compiled JS custom scripts file.
	jsCustomFile: 'main', // Compiled JS custom file name. Default set to custom i.e. custom.js.

	// Images options.
	imgSRC: './dev/img/**/*.{png,jpg,gif}', // Source folder of images which should be optimized and watched. You can also specify types e.g. raw/**.{png,jpg,gif} in the glob.
	imgDST: './site/web/app/themes/amymidis.com/img/', // Destination folder of optimized images. Must be different from the imagesSRC folder.

	// Watch files paths.
	watchStyles: './dev/css/**/*.scss', // Path to all *.scss files inside css folder and inside them.
	watchJsVendor: './dev/js/vendor/*.js', // Path to all vendor JS files.
	watchJsCustom: './dev/js/*.js', // Path to all custom JS files.
	watchPhp: './**/*.php', // Path to all PHP files.

	// Translation options.
	textDomain: 'WPGULP', // Your textdomain here.
	translationFile: 'WPGULP.pot', // Name of the translation file.
	translationDestination: './languages', // Where to save the translation files.
	packageName: 'WPGULP', // Package name.
	bugReport: 'https://AhmadAwais.com/contact/', // Where can users report bugs.
	lastTranslator: 'John Galyon <galyon.jb@gmail.com>', // Last translator Email ID.
	team: 'John Galyon <galyon.jb@gmail.com>', // Team's Email ID.

	// Browsers you care about for autoprefixing. Browserlist https://github.com/ai/browserslist
	// The following list is set as per WordPress requirements. Though, Feel free to change.
	BROWSERS_LIST: [
		'last 2 version',
		'> 1%',
		'ie >= 11',
		'last 1 Android versions',
		'last 1 ChromeAndroid versions',
		'last 2 Chrome versions',
		'last 2 Firefox versions',
		'last 2 Safari versions',
		'last 2 iOS versions',
		'last 2 Edge versions',
		'last 2 Opera versions'
	]
};
