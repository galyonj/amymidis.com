<?php
/**
 * Filename: confirmation.php
 * Author: jgalyon
 * Created: 2019/03/05
 * Description:
 **/

add_filter( 'the_content', 'confirmation_message' );

function confirmation_message( $content ) {
	$contribution = $_GET['contribution'];
	$name         = $_GET['first_name'];
	$email        = $_GET['email'];
	$form         = $_GET['fid'];
	$mailchimp    = $_GET['list_inclusion'];
	$message      = '';

	if ( is_page( 'thank-you' ) ) {
		$message .= '<p>Dear ' . $name . ',</p>';

		if ( $form === "3" ) {
			$message .= '<p>Thank you for your ' . $contribution . ' contribution to Amy\'s campaign for Knoxville City Council!</p>';
			if( $mailchimp ) {
				$mesage .= '<p>Be sure to check your email at ' . $email . ' for an additional message confirming that you wish to receive emails from Amy\'s campaign.</p>';
			}
		} else if ( $form === "4" ) {
			$message .= '<p>Thank you for adding your email address, ' . $email . ', to Amy\'s mailing list! Check your email for an additional message confirming that you wish to receive emails from Amy\'s campaign.</p>';

		} else if ( $form === "5" ) {
			$message .= '<p>Thank you for your offer to volunteer for Amy\'s campaign for Knoxville City Council!</p>';
			$message .= '<p>We will be in touch regarding your offer within 24 hours.</p>';
		} else {
			$message .= '<p>Thank you for your message! You will receive a response within 24 hours.</p>';
		}

		$message .= '<p>If you have any questions, please contact us at <a href="mailto:votemidis@gmail.com">votemidis@gmail.com</a>.</p>';
	}

	return $content . $message;
}
