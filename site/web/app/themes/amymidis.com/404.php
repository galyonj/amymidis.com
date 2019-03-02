<?php
/**
 * Filename: 404.php
 * Author: jgalyon
 * Created: 2019/03/01
 * Description:
 **/

get_header(); ?>

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

<?php get_footer(); ?>
