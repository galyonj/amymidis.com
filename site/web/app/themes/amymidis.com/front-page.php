<?php
/**
 * Filename: front-page.php
 * Author: jgalyon
 * Created: 2019.01.16
 * Description:
 **/

get_header();
if ( have_posts() ) : while( have_posts() ) :
	the_post(); ?>

	<?php $img = get_field( 'page_background' );
	$imgUrl    = esc_url( $img['url'] ); ?>
	<div class="jumbotron front-page jarallax" data-jarallax data-speed="0.2">
		<img class="jarallax-img" src="<?php echo esc_url( $img['url'] ); ?>" alt="<?php echo $img['alt']; ?>">
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-sm-offset-5 col-lg-5 col-lg-offset-6">
					<?php the_title( '<h1>', '</h1>' ); ?>
					<?php echo the_excerpt(); ?>
				</div>
			</div>
		</div>
	</div>

	<?php get_template_part( 'view/content', 'callouts' ); ?>

	<main class="container">
		<div class="row content-row">
			<article id="<?php the_ID(); ?>" <?php body_class( 'col-xs-12 col-md-8 col-md-offset-2' ); ?>>
				<?php the_content(); ?>
			</article>
		</div>
	</main>

	<?php
	$cta_headline = get_field( 'mail_title' );
	$cta_text     = get_field( 'mail_cta' );
	$cta_bkg      = get_field( 'mail_bkg_img' );
	if ( $cta_headline ) : ?>
		<div class="jumbotron mail-ask jarallax" data-jarallax data-speed="0.5">
			<div class="triangle"></div>
			<img class="jarallax-img" src="<?php echo esc_url( $cta_bkg['url'] ); ?>" alt="<?php echo $cta_bkg['alt']; ?>">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 headline-col">
						<h2><?php echo $cta_headline; ?></h2>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-6 cta-col">
						<?php echo $cta_text; ?>
					</div>
					<div class="col-xs-12 col-sm-6 mail-form-col">
						<?php echo do_shortcode('[gravityform id=3 title=false description=false]'); ?>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>

	<?php
	$secondary_content = get_field('secondary_content'); if($secondary_content) : ?>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-8 col-md-offset-2">
					<?php echo $secondary_content; ?>
				</div>
			</div>
		</div>
	<?php endif; ?>

<?php endwhile;
endif;
get_footer(); ?>
