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
});

( function() {
	$( document ).ready( function() {
		$( '.scroll-top' ).hide();

		$( window ).scroll( function showScrollButton() {
			if ( 100 < $( this ).scrollTop() ) {

				// if the window's position is greater than 100 pixels away from the top
				// of the page, fade the scroll button in
				$( '.scroll-top' ).fadeIn();
			} else {

				// if not, fade the button so it's out of the way
				$( '.scroll-top' ).fadeOut();
			}
		});
	});
}( jQuery ) );

