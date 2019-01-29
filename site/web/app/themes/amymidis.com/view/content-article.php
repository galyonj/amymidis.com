<?php
/**
 * Filename: content-article.php
 * Author: jgalyon
 * Created: 2019.01.16
 * Description:
 **/

?>

<article class="row">
	<?php if(!is_front_page()) : ?>
		<div class="col-sm-12 col-md-9">
			<?php the_content(); ?>
		</div>
	<?php elseif(is_page('donations')) : ?>

		<div class="col-md-9 col-md-offset-3">
			<?php the_content(); ?>
		</div>
	<?php else: ?>
		<div class="col-xs-12">
			<?php the_content(); ?>
		</div>
	<?php endif; ?>
</article>
