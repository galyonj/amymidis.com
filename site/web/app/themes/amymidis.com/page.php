<?php
/**
 * Filename: page.php
 * Author: jgalyon
 * Created: 2019/01/26
 * Description:
 **/

get_header();
if ( have_posts() ) : while( have_posts() ) :
	the_post(); ?>

	<?php if ( is_page( array(7, 23, 26, 28 ) ) ) : ?>
		<main>
			<?php get_template_part( 'view/content', 'header' ); ?>
			<div class="container">
				<div class="row content-row">
					<article id="<?php the_ID(); ?>" <?php post_class( 'col-xs-12 col-md-8' ); ?>>
						<?php the_content(); ?>
					</article>
				</div>
			</div>
		</main>
	<?php else : ?>
		<main class="container">
			<?php get_template_part( 'view/content', 'header' ); ?>
			<div class="row content-row">
				<article id="<?php the_ID(); ?>" <?php body_class( 'col-xs-12 col-md-8' ); ?>>
					<?php the_content(); ?>
				</article>
			</div>
		</main>
	<?php endif; ?>

<?php endwhile; endif;
get_footer(); ?>
