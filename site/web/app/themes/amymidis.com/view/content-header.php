
<?php
/**
 * Filename: content-header.php
 * Author: jgalyon
 * Created: 2018/09/21
 * Description:
 **/

?>
<header class="row article-header">
	<?php if(!is_page('contribute')) : ?>
		<div class="col-xs-12 breadcrumbs-col">
			<?php galyon_breadcrumbs(); ?>
		</div>
		<div class="col-xs-12 headline-col">
			<?php content_heading(); ?>
		</div>
	<?php else : ?>
		<div class="col-xs-12 col-md-8 col-md-offset-2 headline-col">
			<?php content_heading(); ?>
		</div>
	<?php endif; ?>
</header>
