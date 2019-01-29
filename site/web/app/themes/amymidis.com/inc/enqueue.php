<?php
/**
 * Filename: enqueue.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * Enqueue scripts and styles specific to this theme
 * We're also adding the server time at which the
 * file was uploaded so that we can do our own version
 * control for testing/cache-busting purposes
 **/
function enqueue() {

	$js_path = trailingslashit( get_template_directory() ) . 'assets/js/main.min.js';
	$css_path = trailingslashit( get_template_directory() ) . 'assets/css/main.min.css';
	$req_path = trailingslashit( get_template_directory() ) . 'assets/js/vendor.min.js';

	wp_enqueue_script(

		'req_js',
		trailingslashit( get_stylesheet_directory_uri() ) . 'assets/js/vendor.min.js',
		false,
		filemtime($req_path),
		true

	);

	wp_enqueue_script(

		'main_js',
		trailingslashit( get_stylesheet_directory_uri() ) . 'assets/js/main.min.js',
		false,
		filemtime($js_path),
		true

	);

	wp_enqueue_style(

		'main_css',
		trailingslashit( get_stylesheet_directory_uri() ) . 'assets/css/main.min.css',
		false,
		filemtime($css_path),
		'all'

	);

}
add_action( 'wp_enqueue_scripts', 'enqueue');

// Fix the jquery version used on the front end of the site
if ( !is_admin() ) {
	add_action( 'wp_enqueue_scripts', function() {
		wp_deregister_script('jquery');

		wp_register_script(
			'jquery',
			trailingslashit( get_template_directory_uri() ) . 'jquery-3.3.1.min.js',
			false,
			'',
			false
		);

		wp_enqueue_script('jquery');
	});
}


// Apply the theme's stylesheet to the visual editor
function editor_styles() {

	add_editor_style( 'assets/css/editor-style.css' );

}
add_action( 'init', 'editor_styles' );

/**
 * This strips the WordPress version number from script and stylesheet
 * source files loaded on the pages. As a security best practice
 * two filters are instantiated to call the function below at runtime:
 * One filter for loading stylesheets, another for loading scripts.
 */
function remove_wp_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' . get_bloginfo( 'version' ) ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}
add_filter( 'style_loader_src', 'remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'remove_wp_ver_css_js', 9999 );
