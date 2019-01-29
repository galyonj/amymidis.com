<?php
/**
 * Filename: editor.php
 * Author: jgalyon
 * Created: 2019/01/28
 * Description:
 * This code adds a button th contain a formats drop-down menu
 * to the WordPress editor. This menu allows users to easily
 * choose and implement special styling options within the
 * TinyMCE editor.
 *
 * @param $buttons
 *
 * @return mixed
 */

function add_style_select_buttons( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
// Register our callback to the appropriate filter
add_filter( 'mce_buttons', 'add_style_select_buttons' );

/**
 * Returns an array of customized formats
 * for use in the WordPress editor in the
 * hopes that the experience will be more
 * intuitive for content editors.
 *
 * @param $init_array
 *
 * @return mixed
 */

function custom_editor_formats( $init_array ) {

	$style_formats = array(
		// List Styling
		array(
			'title' => __( 'Block-level elements', 'amy' ),
			'items' => array(
				array(
					'title'    => __( 'Full-Width Well', 'amy' ),
					'block'    => 'div',
					'classes'  => 'well',
					'wrapper'  => true,
				),
				array(
					'title'    => __( 'Half-Width Well Left', 'amy' ),
					'block'    => 'div',
					'classes'  => array( 'well', 'half-left' ),
					'wrapper'  => true,
				),
				array(
					'title'    => __( 'Half-Width Well Right', 'amy' ),
					'block'    => 'div',
					'classes'  => array( 'well', 'half-right' ),
					'wrapper'  => true,
				),
			)
		),
		// Custom List Styling
		array(
			'title' => __( 'Special Lists', 'amy' ),
			'items' => array(
				array(
					'title' => __( 'Two Column List', 'amy' ),
					'selector' => 'ul',
					'classes'  => 'two-column'
				),
				array(
					'title' => __( 'Two Column Text List', 'amy' ),
					'selector' => 'ul',
					'classes'  => 'text-columns'
				),
				array(
					'title' => __( 'Three Column List', 'amy' ),
					'selector' => 'ul',
					'classes'  => 'three-column'
				),
			)
		),
		// Custom Type Styling
		array(
			'title' => __( 'Special Type Styles', 'amy' ),
			'items' => array(
				array(
					'title'    => __( 'Button', 'amy' ),
					'selector' => 'a',
					'classes'  => array( 'btn', 'btn-primary' )
				),
				array(
					'title'    => __( 'Lead Paragraph', 'amy' ),
					'selector' => 'p',
					'classes'  => 'lead'
				),
				array(
					'title'    => __( 'Blockquote Citation', 'amy' ),
					'block'    => 'footer'
				)
			)
		),
		// Tables
	);
	// Insert the array, JSON ENCODED, into 'style_formats'
	$init_array[ 'style_formats' ] = json_encode( $style_formats );

	return $init_array;

}
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'custom_editor_formats' );
