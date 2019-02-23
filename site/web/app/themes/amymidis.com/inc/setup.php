<?php
/**
 * Filename: setup.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * This file contains all the functions that are required for basic functional
 * changes for the theme.
 **/

function theme_features() {
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'comment-form', 'comment-list' ) );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_post_type_support( 'page', 'excerpt' );
}

add_action( 'after_setup_theme', 'theme_features' );

// Filter the default text displayed in the footer of the WordPress dashboard.
function admin_footer_update() {

	echo 'This tool is for authorized users only. Your IP address has been recorded.';
}

add_filter( 'admin_footer_text', 'admin_footer_update' );

// remove junk from head
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'start_post_rel_link', 10 );
remove_action( 'wp_head', 'parent_post_rel_link', 10 );
remove_action( 'wp_head', 'adjacent_posts_rel_link', 10 );

// Put the image title back where it belongs.
function restore_image_title( $html, $id ) {

	$attachment = get_post( $id );
	$mytitle    = $attachment -> post_title;

	return str_replace( '<img', '<img title="' . $mytitle . '" ', $html );

}

add_filter( 'media_send_to_editor', 'restore_image_title', 15, 2 );

// emojis are stupid and we hate them
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

// Add the page slug to body_class();
function add_slug_body_class( $classes ) {
	global $post;
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}
	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

// To output these custom settings fields in theme files, simply echo the
// field ID that is set in add_settings_field.
// ex `echo get_option( 'my_custom_field_id' );
add_action( 'admin_init', 'add_tracking_codes' );
function add_tracking_codes() {
	add_settings_section(
		'add_tracking_codes', // Section ID
		'Add Tracking Codes', // Section Title
		'tracking_codes_callback', // Callback
		'general' // What Page?  This makes the section show up on the General Settings Page
	);

	add_settings_field( // Option 1
		'google_tag_manager_id', // Option ID
		'Google Tag Manager ID', // Label
		'google_tag_manager_id_callback', // !important - This is where the args go!
		'general', // Page it will be displayed (General Settings)
		'add_tracking_codes', // Name of our section
		array( // The $args
			'google_tag_manager_id' // Should match Option ID
		)
	);

	register_setting( 'general', 'google_tag_manager_id', 'esc_attr' );
}

function tracking_codes_callback() {
	echo '<p>Add the Google Tag Manager ID.</p>';
}

// Textbox Callback
function google_tag_manager_id_callback( $args ) {
	$option = get_option( $args[0] );
	echo '<input type="text" id="' . $args[0] . '" name="' . $args[0] . '" value="' . $option . '" class="regular-text ltr"/>';
}

add_filter( 'gform_field_container', 'add_bootstrap_container_class', 10, 6 );
function add_bootstrap_container_class( $field_container, $field, $form, $css_class, $style, $field_content ) {
	$id = $field->id;
	$field_id = is_admin() || empty( $form ) ? "field_{$id}" : 'field_' . $form['id'] . "_$id";
	return '<li id="' . $field_id . '" class="' . $css_class . ' form-group">{FIELD_CONTENT}</li>';
}
