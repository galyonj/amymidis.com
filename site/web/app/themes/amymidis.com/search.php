<?php
/**
 * Filename: search.php
 * Author: jgalyon
 * Created: 2019/01/26
 * Description:
 **/

get_header(); ?>

<main class="container">
	<?php get_template_part( 'view/content', 'header' ); ?>
	<div class="row content-row">
		<article id="<?php the_ID(); ?>" <?php post_class( 'col-md-8' ); ?>>
			<?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
				<h2><a href="<?php the_permalink(); ?>" title="Read <?php the_title(); ?>"><?php the_title(); ?></a></h2>
				<p class="small">Posted on <time datetime="<?php echo get_the_date( 'c'); ?>"><?php echo
						get_the_date(); ?></time></p>
				<?php the_excerpt(); ?>

			<?php endwhile; ?>

				<?php
				the_posts_pagination( array(
					'mid_size'  => 2,
					'prev_text' => __( '<i class="fa fa-caret-left" aria-hidden="true"></i>' , 'covnet' ),
					'next_text' => __( '<i class="fa fa-caret-right" aria-hidden="true"></i>', 'covnet' )
				) );
			endif; ?>
		</article>
	</div>
</main>

<?php get_footer(); ?>
