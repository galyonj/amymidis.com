<?php
/**
 * Filename: page.php
 * Author: jgalyon
 * Created: 2019/01/26
 * Description:
 **/

get_header();
if ( have_posts() ) : while( have_posts() ) : the_post(); ?>

	<main class="container">
		<?php get_template_part( 'view/content', 'header' ); ?>
		<div class="row content-row">

			<?php if( !is_front_page() ) : ?>
				<article id="<?php the_ID(); ?>" <?php body_class( 'col-xs-12 col-md-8' ); ?>>
			<?php else : ?>
				<article id="<?php the_ID(); ?>" <?php body_class( 'col-xs-12 col-md-8 col-md-offset-2' ); ?>>
			<?php endif; ?>
				<?php the_content(); ?>
			</article>
		</div>
	</main>

<?php endwhile; endif;
get_footer(); ?>
