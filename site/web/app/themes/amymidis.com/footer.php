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
		<?php if( ! is_front_page() ) : ?>
		<footer role="contentinfo">
			<div class="container">
				<div class="row">
					<div class="col-xs-6 col-xs-offset-3 col-sm-3 col-sm-offset-0 brand-col">
						<a href="<?php echo get_home_url( '/' ); ?>">
							<img src="<?php echo trailingslashit( get_stylesheet_directory_uri() ); ?>img/logo.svg" alt="Amy Midis for Knoxville City
	Council website logo"
							class="img-responsive">
						</a>
					</div>
					<div class="col-xs-12 col-sm-8 nav-col">
						<div class="row">
							<div class="col-xs-12">
								<h2>Connect</h2>
								<ul class="contact-amy">
									<li><span class="fa-li"><i class="fas fa-envelope"></i></span><a href="mailto:votemidis@gmail.com">votemidis@gmail.com</a></li>
									<li><span class="fa-li"><i class="fas fa-phone"></i></span><a href="tel://1-865-384-1558">(865) 384-1558</a></li>
								</ul>
								<?php
								$args = array(
									'theme_location'  => 'social-nav',
									'menu'            => 'social-nav',
									'container'       => false,
									'menu_class'      => 'social-nav',
									'echo'            => true,
									'fallback_cb'     => 'wp_page_menu',
									'depth'           => 0,
								);

								wp_nav_menu( $args );
								?>
							</div>
							<div class="col-xs-12">
								<h2>Navigation</h2>
								<?php
								$args = array(
									'theme_location'  => 'footer-nav',
									'menu'            => 'footer-nav',
									'container'       => false,
									'menu_class'      => 'footer-nav',
									'echo'            => true,
									'fallback_cb'     => 'wp_page_menu',
									'depth'           => 0,
								);

								wp_nav_menu( $args );
								?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom-wrapper">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 attribution-col">
							<p class="small">Paid for by <strong>Amy Midis for Knoxville City Council</strong>. XXXX XXXXXXXXXX, treasurer.</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<?php endif; ?>
		<?php wp_footer(); ?>
	</body>
</html>
