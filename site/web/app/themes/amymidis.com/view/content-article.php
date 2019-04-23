<?php
/**
 * Filename: content-article.php
 * Author: jgalyon
 * Created: 2019.01.16
 * Description:
 **/

$user = wp_get_current_user(); ?>

<article class="row">
	<?php if ( ! is_front_page() ) : ?>
		<div class="col-sm-12 col-md-9">
			<?php
			// Bring out the content
			the_content(); ?>

			<?php
			// Add the forms to each page that needs a form, to get the form out of the content area
			/*if ( is_page( array( 32, 33, 159 ) ) ) {
				if ( is_page( 33 ) ) {
					gravity_form( 5, false, false, false, '', false );
					//echo do_shortcode( '[gravityform id=5 title=false description=false]' );
				} else if ( is_page( 159 ) ) {
					gravity_form( 6, false, false, false, '', false );
					//echo do_shortcode( '[gravityform id=6 title=false description=false]' );
				} else {
					gravity_form( 3, false, false, false, '', false );
					//echo do_shortcode( '[gravityform id=3 title=false description=false]' );
				}
			}*/
			?>
		</div>
	<?php endif; ?>
</article>
