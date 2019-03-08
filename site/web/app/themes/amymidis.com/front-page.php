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
				<div class="col-sm-6 col-sm-offset-5 col-lg-offset-6">
					<?php the_title( '<h1>', '</h1>' ); ?>
					<?php echo the_excerpt(); ?>
					<img src="<?php echo trailingslashit( get_template_directory_uri() ); ?>img/amy-sig.svg" alt="Amy Midis signature"
					     style="width: 130px; height: auto; text-shadow: 3px 3px 13px rgba(0, 0, 0, 0.8);">
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
	<!--<div class="juicer-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<?php /*juicer_feed("name=votemidis&per=6"); */?>
				</div>
			</div>
		</div>
	</div>-->

	<?php
	$reviews_headline = get_field( 'reviews_title' );
	$reviews_cta = get_field( 'reviews_cta' );
	$reviews_bkg      = get_field( 'reviews_bkg_img' ); ?>
	<div class="jumbotron reviews jarallax" data-jarallax data-speed="0.5">
		<div class="triangle"></div>
		<img class="jarallax-img" src="<?php echo esc_url( $reviews_bkg['url'] ); ?>" alt="<?php echo $reviews_bkg['alt']; ?>">
		<div class="container">
			<?php if($reviews_headline) : ?>
				<div class="row">
					<div class="col-md-8 col-md-offset-2">
						<h2><?php echo $reviews_headline; ?></h2>
					</div>
				</div>
			<?php endif; ?>
			<div class="row">
				<div class="col-md-8 col-md-offset-2 review-text">
					<?php do_action( 'wprev_pro_plugin_action', 1 ); ?>
					<a class="btn btn-primary" target="_blank" href="https://www.facebook.com/pg/votemidis/reviews/?utm_source=website_banner">
						Add your voice!
					</a>
				</div>
			</div>
		</div>
	</div>

<?php endwhile;
endif;
get_footer(); ?>
