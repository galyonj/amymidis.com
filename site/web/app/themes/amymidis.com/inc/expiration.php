<?php
/**
 * Filename: expiration.php
 * Author: jgalyon
 * Created: 2019/04/22
 * Description:
 **/

// m/d/Y g:i a

if ($expireTransient = get_transient($post->ID) === false) {
	set_transient($post->ID, 'set for 1 minutes', 1 * MINUTE_IN_SECONDS );
	$today = date('U');
	$args = array(
		'post_type' => 'post',
		'posts_per_page' => 200,
		'post_status' => 'publish',
		'meta_query' => array(
			array(
				'key' => 'post_expiration_date',
				'value' => $today,
				'compare' => '<='
			)
		)
	);
	$posts = get_posts($args);
	foreach( $posts as $post ) {
		if(get_field('post_expiration_date', $post->ID)) {
			$postdata = array(
				'ID' => $post->ID,
				'post_status' => 'draft'
			);
			wp_update_post($postdata);
		}
	}
}
