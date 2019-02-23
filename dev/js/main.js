const scroll = new SmoothScroll( 'a[href*="#"]', {

	// Selectors
	ignore: 'no-scroll', // Selector for links to ignore (must be a valid CSS selector)
	header: null, // Selector for fixed headers (must be a valid CSS selector)

	// Speed & Easing
	speed: 666, // Integer. How fast to complete the scroll in milliseconds
	offset: 0, // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
	easing: 'easeInOutQuint', // Easing pattern to use
	//customEasing: function (time) {}, // Function. Custom easing pattern

	// Callback API
	before: function() {
	}, // Callback to run before scroll
	after: function() {
	} // Callback to run after scroll
} );

( function() {
	$( document ).ready( function() {
		$( '.gchoice_3_13_7' ).prepend( '<label for="other_donation_amount" id="label_3_13_other" class="sr-only">Enter your own amount</label>' );
		$( '.scroll-top' ).hide();
		$( '.employer_field, .occupation_field' ).find( 'label' ).append( '<span class="gfield_required">*</span>' );
		$( '.employer_field input, .occupation_field input' ).attr( 'required', 'required' );
		$( '#input_3_13_other' ).attr( 'name', 'other_donation_amount' );

		$( window ).scroll( function showScrollButton() {
			if (100 < $( this ).scrollTop()) {

				// if the window's position is greater than 100 pixels away from the top
				// of the page, fade the scroll button ins
				$( '.scroll-top' ).fadeIn();
			} else {

				// if not, fade the button so it's out of the way
				$( '.scroll-top' ).fadeOut();
			}
		} );

		$( '.ginput_card_security_code_icon' ).remove();

		$( '#choice_3_60_1' ).prependTo( $( '#label_3_60_1' ) ).prepend( '<span class="cr"><i class="cr-icon fas fa-check"></i></span>' );
	} );

	// This function pushes the footer down
	// on pages that have short content
	$( window ).on( 'load resize', function stickyFooter() {

		// sticky footer stuff
		const windowHeight = $( window ).height(),
			adminbarHeight = $( '#wpadminbar' ).height(),
			contentHeight = $( '.wrapper' ).outerHeight(),
			footerHeight = $( 'footer' ).outerHeight();

		if (contentHeight + footerHeight < windowHeight) {
			if ($( '#wpadminbar' ).length) {
				$( '.wrapper' ).css( 'margin-bottom', windowHeight - ( contentHeight + footerHeight + adminbarHeight ) );
			} else {
				$( '.wrapper' ).css( 'margin-bottom', windowHeight - ( contentHeight + footerHeight ) );
			}
		}
	} );

	$( '#input_3_13_other' ).focus( function() {
		$( '#input_3_13_other' ).inputmask( {
			alias: 'currency',
			allowMinus: false,
			clearMaskOnLostFocus: false,
			digits: 2,
			prefix: '$'
		} );
	} ).change( function() {
		let otherVal = $( this ).val();

		$( '#choice_3_13_7' ).val( otherVal );
		$( '#input_3_69' ).html( otherVal );
		$( '#ginput_base_price_3_69' ).val( otherVal );
	} );

	$( '#choice_3_60_1' ).click( function() {
		if ($( this ).is( ':checked' )) {
			$( '.employer_field, .occupation_field' ).hide().find( 'input' ).attr( 'disabled', 'disabled' );
		} else {
			$( '.employer_field, .occupation_field' ).show().find( 'input' ).removeAttr( 'disabled' );
		}
	} );
}( jQuery ) );
