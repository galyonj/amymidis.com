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
		$( '.scroll-top' ).hide();
		$( window ).scroll( function showScrollButton() {
			if ( 100 < $( this ).scrollTop() ) {

				// if the window's position is greater than 100 pixels away from the top
				// of the page, fade the scroll button ins
				$( '.scroll-top' ).fadeIn();
			} else {

				// if not, fade the button so it's out of the way
				$( '.scroll-top' ).fadeOut();
			}
		} );

		$( '.ginput_card_security_code_icon, .warningTextareaInfo' ).remove();
		$( '.gchoice_3_13_7' ).prepend( '<label for="other_donation_amount" id="label_3_13_other" class="sr-only">Enter your own amount</label>' );
		$( '.employer_field, .occupation_field' ).find( 'label' ).append( '<span class="gfield_required">*</span>' );
		$( '.employer_field input, .occupation_field input' ).attr( 'required', 'required' );
		$( '#input_3_13_other' );

		$( '.gfield_checkbox li ' ).each( function() {
			let li = $( this );

			li.children( 'label' ).append( li.children( 'input' ) ).append( '<span class="cr"><i class="cr-icon fas fa-check"></i></span>' );
		} );

		$( 'a:not([href^="#"])' ).each( function() {
			let elem = $( this );
			elem.attr( 'rel', 'noreferrer' );
		} );
	} );

	// This function pushes the footer down
	// on pages that have short content
	$( window ).on( 'load resize', function stickyFooter() {

		// sticky footer stuff
		const windowHeight = $( window ).height(),
			adminbarHeight = $( '#wpadminbar' ).height(),
			contentHeight = $( '.wrapper' ).outerHeight(),
			footerHeight = $( 'footer' ).outerHeight();

		if ( contentHeight + footerHeight < windowHeight ) {
			if ( $( '#wpadminbar' ).length ) {
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

	$( '#choice_3_60_1, #choice_5_60_1' ).click( function() {
		if ( $( this ).is( ':checked' ) ) {
			$( '.employer_field, .occupation_field' ).hide().find( 'input' ).attr( 'disabled', 'disabled' );
		} else {
			$( '.employer_field, .occupation_field' ).show().find( 'input' ).removeAttr( 'disabled' );
		}
	} );

	// Set the padding for the front page jumbotron
	$( window ).on( 'load', function() {
		let mqxs = window.matchMedia( 'screen and (max-width: 767px)' ),
			mqTabletPortrait = window.matchMedia( 'only screen and (max-width: 768px) and (orientation: portrait)' ),
			mqTabletLandscape = window.matchMedia( 'only screen and (max-width: 1024px) and (orientation: landscape)' ),
			windowHeight = $( window ).height(),
			windowWidth = $( window ).width(),
			adminBar = $( '#wpadminbar' ),
			adminBarHeight = adminBar.height(),
			containerMargin = '',
			navbarHeight = $( 'header' ).outerHeight( true ),
			mastheadContentHeight = $( '.jumbotron.front-page .row' ).height();

		if ( mqxs.matches ) {
			if ( adminBar.length ) {
				containerMargin = ( windowHeight - adminBarHeight - navbarHeight - mastheadContentHeight ) / 2;
			} else {
				containerMargin = ( windowHeight - navbarHeight - mastheadContentHeight ) / 2;
			}
			console.log( 'probably a phone' );
		} else {
			if ( windowWidth >= 768 && windowWidth <= 991 ) {
				containerMargin = windowWidth * 0.15;
			} else if ( windowWidth >= 992 && windowWidth <= 1199 ) {
				if ( mqTabletLandscape.matches ) {
					if ( adminBar.length ) {
						containerMargin = ( windowHeight - adminBarHeight - navbarHeight - mastheadContentHeight ) / 2;
					} else {
						containerMargin = ( windowHeight - navbarHeight - mastheadContentHeight ) / 2;
					}
				} else {
					containerMargin = windowWidth * 0.15;
				}
			} else {
				containerMargin = windowWidth * 0.10;
			}
		}

		$( '.jumbotron.front-page' ).css( 'padding', containerMargin + 'px 0' );
	} ).trigger( 'resize' );


	// set focus to the search bar when it's been exposed
	// at sizes larger than 767px.
	$( '.dropdown' ).on( 'shown.bs.dropdown', function( event ) {
		var dropdown = $( event.target );

		dropdown.find( '.dropdown-menu li .navbar-form .input-group .search-query.form-control' ).focus();
	} );
}( jQuery ) );

$( '.dropdown' ).on( 'shown.bs.dropdown', function( event ) {
	let dropdown = $( event.target );

	setTimeout(function() {
		dropdown.find( 'input.search-query' ).focus();
	}, 10 );
} );
