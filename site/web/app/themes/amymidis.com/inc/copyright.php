<?php
/**
 * Filename: copyright.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * Automate the copyright year output.
 * In templates, add <?php copyright( 'auto' ); ?> to output the current year.
 * To show a range of copyright years, replace 'auto' with a string representing
 * the year you wish to begin the range.
 * @param string $year
 */

function copyright( $year = 'auto') {
	if( intval( $year ) == 'auto' ) $year = date( 'Y' );

	if( intval( $year ) != date( 'Y' ) ) {
		if( intval( $year ) > date( 'Y' ) ) {
			echo date( 'Y' );
		} else {
			echo intval( $year ) . ' – ' . date( 'Y' );
		}
	} else {
		echo intval( $year );
	}
}
