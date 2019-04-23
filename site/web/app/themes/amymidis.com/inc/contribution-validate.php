<?php
/**
 * Filename: contribution-validate.php
 * Author: jgalyon
 * Created: 2019/03/29
 * Description:
 **/

add_filter( 'gform_field_validation_3_69', 'custom_validation', 10, 4 );
function custom_validation( $result, $value, $form, $field ) {
	//change value for price field to just be numeric (strips off currency symbol, etc.) using Gravity Forms to_number function
	//the second parameter to to_number is the currency code, ie "USD", if not specified USD is used
	$number = GFCommon::to_number( $value, '' );

	if ( $result['is_valid'] && intval( $number ) < 1 ) {
		$result['is_valid'] = false;
		$result['message'] = 'You may not make a contribution of $0.00.';
	}
	return $result;
}
