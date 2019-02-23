<?php
/**
 * Filename: header-navbar.php
 * Author: jgalyon
 * Created: 2019/02/06
 * Description:
 **/

?>

<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button class="navbar-donate visible-xs" type="button">Contribute</button>
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="sr-only">toggle navigation menu</span>
			</button>
			<a href="<?php echo home_url(); ?>" class="navbar-brand">
				<img src="<?php echo trailingslashit( get_stylesheet_directory_uri() ); ?>img/logo.svg"
				     alt="<?php echo bloginfo( 'name' ); ?>" title="<?php echo bloginfo( 'name' ); ?>">
				<?php
				if ( get_bloginfo( 'description' ) !== '' ) {
					echo '<small class="sr-only">' . get_bloginfo( 'description' ) . '</small>';
				}
				?>
			</a>
		</div>
		<div class="collapse navbar-collapse" id="navbar">
			<ul class="nav navbar-nav navbar-right">
				<?php
				$args = array(
					'theme_location'  => 'main-nav',
					'menu'            => 'main-nav',
					'container'       => false,
					'menu_class'      => '',
					'echo'            => true,
					'fallback_cb'     => 'wp_page_menu',
					'depth'           => 0,
					'items_wrap'      => '%3$s'
				);

				wp_nav_menu( $args );
				?>
				<li>
					<form action="<?php echo home_url( '/' ); ?>" class="navbar-form" role="search" method="get" id="searchform">
						<div class="form-group">
							<label for="search" class="sr-only">Search amymidis.com</label>
							<input name="search" id="s" type="text" class="search-query form-control" autocomplete="on" placeholder="<?php _e
							('Search',''); ?>">
						</div>
					</form>
				</li>
			</ul>
		</div>
	</div>
</nav>
