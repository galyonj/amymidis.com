<?php
/**
 * Filename: front-page.php
 * Author: jgalyon
 * Created: 2019.01.16
 * Description:
 **/

get_header();
if ( have_posts() ) : while( have_posts() ) : the_post(); ?>

	<div class="container" id="content">
		<?php get_template_part( 'views/content', 'masthead' ); ?>
		<?php get_template_part( 'views/content', 'notification' ); ?>

		<main id="<?php the_ID(); ?>" <?php body_class(); ?>>
			<?php get_template_part( 'view/content', 'article' ); ?>
		</main>
	</div>

<?php endwhile; endif;
get_footer(); ?>
