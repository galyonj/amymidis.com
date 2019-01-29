<?php
/**
 * Filename: navbars.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * Register navbars for use in the theme.
 **/

function nav_menus() {
	$locations = array(
		'footer-nav' => 'Footer Navigation',
		'main-nav'   => 'Main Navigation',
		//'social-nav' => 'Social Navigation',
	);

	register_nav_menus( $locations );
}
add_action( 'init', 'nav_menus' );
