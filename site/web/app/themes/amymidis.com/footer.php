<?php
/**
 * Filename: footer.php
 * Author: jgalyon
 * Created: 2019.01.25
 * Description:
 **/
?>

</div>
</div>
<footer role="contentinfo">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 footer-content">
				<div class="brand-col">
					<a href="<?php echo get_home_url( '/' ); ?>">
						<img src="<?php echo trailingslashit( get_stylesheet_directory_uri() ); ?>img/logo-rev-tagline.svg"
						     alt="Amy Midis for City Council website logo" class="img-responsive">
					</a>
				</div>
				<div class="info-col">
					<div class="connect-col">
						<h2 class="hidden-xs">Connect</h2>
						<?php
						$args = array(
							'theme_location' => 'social-nav',
							'menu'           => 'social-nav',
							'container'      => false,
							'menu_class'     => 'social-nav',
							'echo'           => true,
							'fallback_cb'    => 'wp_page_menu',
							'depth'          => 0,
						);

						wp_nav_menu( $args );
						?>
					</div>
					<div class="nav-col">
						<h2 class="hidden-xs">Links</h2>
						<?php
						$args = array(
							'theme_location' => 'footer-nav',
							'menu'           => 'footer-nav',
							'container'      => false,
							'menu_class'     => 'footer-nav',
							'echo'           => true,
							'fallback_cb'    => 'wp_page_menu',
							'depth'          => 0,
						);

						wp_nav_menu( $args );
						?>
					</div>
					<div class="signup-col">
						<?php
						$cta_headline = get_field( 'mail_title', 2 );
						$cta_text     = get_field( 'mail_cta', 2 );
						$cta_bkg      = get_field( 'mail_bkg_img', 2 );
						?>
						<h2><?php echo $cta_headline; ?></h2>
						<?php echo $cta_text; ?>
						<?php echo do_shortcode( '[gravityform id=3 title=false description=false]' ); ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="copyright-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<p>Copyright <a href="<?php echo site_url( '/wp-admin/' ); ?>" rel="noopener nofollow noreferrer">&copy;</a> <?php
						copyright(); ?>. Paid for by <strong>Amy Midis for Knoxville City Council</strong>. Dennis Owen, treasurer.</p>
				</div>
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
