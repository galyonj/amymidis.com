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
			<a href="<?php echo home_url(); ?>" class="navbar-brand">
				<img src="<?php echo trailingslashit( get_stylesheet_directory_uri() ); ?>img/logo.svg"
				     alt="Logo for <?php echo bloginfo( 'name' ); ?>" title="<?php echo bloginfo( 'name' ); ?>">
				<?php
				if ( get_bloginfo( 'description' ) !== '' ) {
					echo '<small class="sr-only">' . get_bloginfo( 'description' ) . '</small>';
				}
				?>
			</a>
			<div class="flex-margin"></div>
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="sr-only">toggle navigation menu</span>
			</button>
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
				<li class="visible-xs">
					<form action="<?php echo home_url( '/' ); ?>" class="navbar-form" role="search" method="get" id="searchform">
						<div class="form-group">
							<label for="s" class="sr-only">Search <?php echo get_bloginfo( 'name' ); ?></label>
							<input name="s" id="s" type="text" class="search-query form-control" autocomplete="on" placeholder="<?php _e
							('Search',''); ?>">
						</div>
					</form>
				</li>
				<li class="hidden-xs dropdown">
					<a href="#" title="Search" class="dropdown-toggle" data-toggle="dropdown"
					   role="button" aria-expanded="false"><i class="fas fa-search"></i></a>
					<ul class="dropdown-menu" role="menu" id="search-dropdown">
						<li>
							<form class="navbar-form" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
								<div class="input-group">
									<label for="s" class="sr-only">Search <?php echo get_bloginfo( 'name' ); ?></label>
									<input name="s" id="s" type="text" class="search-query form-control" autocomplete="on" placeholder="<?php _e('Search',''); ?>">
									<span class="input-group-btn">
									<button class="btn btn-primary" type="submit">Go</button>
								</span>
								</div>
							</form>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>
