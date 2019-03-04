<?php
/**
 * Filename: content-header.php
 * Author: jgalyon
 * Created: 2018/09/21
 * Description:
 **/

?>
<?php if ( is_page( array( 32, 35, 34, 33) ) ) : ?>
	<header class="article-header">
		<?php $img = get_field( 'page_background' ); $imgUrl = esc_url( $img['url'] ); ?>
		<div class="jumbotron content-page" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0) 50%,rgba(0,0,0,0.3) 100%), url(<?php
		echo esc_url( $img['url'] ); ?>); ?>">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<?php content_heading(); ?>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12 breadcrumbs-col">
					<?php galyon_breadcrumbs(); ?>
				</div>
			</div>
		</div>
	</header>
<?php elseif( is_404() ) : ?>
	<header class="article-header">
		<div class="jumbotron error-page">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<?php content_heading(); ?>
					</div>
				</div>
			</div>
		</div>
	</header>
<?php else : ?>
	<header class="row article-header">
		<div class="col-xs-12 headline-col">
			<?php content_heading(); ?>
		</div>
		<div class="col-xs-12 breadcrumbs-col">
			<?php galyon_breadcrumbs(); ?>
		</div>
	</header>
<?php endif; ?>
