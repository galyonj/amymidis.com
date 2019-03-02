<?php
/**
 * Filename: content-callouts.php
 * Author: jgalyon
 * Created: 2019/02/28
 * Description:
 **/

?>

<div class="callout-wrapper">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<?php if ( have_rows( 'callout_box' ) ) : ?>
					<ul class="callout-list">
						<?php
						while( have_rows( 'callout_box' ) ) : the_row();
						$url      = get_sub_field( 'callout_page_link' );
						$icon     = get_sub_field( 'callout_icon' );
						$headline = get_sub_field( 'callout_headline' );
						$text     = get_sub_field( 'callout_text' );
						?>
						<li>
							<ul class="callout">
								<li>
									<a href="<?php echo esc_url($url['url']); ?>" title="<?php echo $url['title']; ?>">
										<?php echo $icon; ?>
									</a>
								</li>
								<li>
									<h2>
										<a href="<?php echo esc_url($url['url']); ?>" title="<?php echo $url['title']; ?>">
											<?php if(!$headline) {
												echo $url['title'];
											} else {
												echo $headline;
											}?>
										</a>
									</h2>
									<p class="hidden-xs"><?php echo $text; ?></p>
								</li>
							</ul>
						</li>
						<?php endwhile; ?>
					</ul>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>
