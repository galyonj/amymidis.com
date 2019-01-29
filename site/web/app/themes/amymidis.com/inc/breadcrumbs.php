<?php
/**
 * Filename: breadcrumbs.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * Create Bootstrap-style breadcrumbs output that can easily be placed on templates that
 * require such functionality. The breadcrumbs themselves can be added using a
 * simple php function call in the theme page, i.e. <?php galyon_breadcrumbs(); ?>
 **/

function galyon_breadcrumbs() {

	// If you want a fancy name for your homepage, you can change this variable
	$homepage_title = 'Home';

	// Set the taxonomy name for any custom post type you may have
	// Learn more about custom post types at https://codex.wordpress.org/Post_Types#Custom_Post_Types
	$custom_taxonomy = 'custom_tax_name';

	// Get the query & post information
	global $post, $wp_query;

	// Make sure that the displayed page isn't the home page itself
	if ( !is_front_page() ) {

		// Let's start building some breadcrumbs
		echo '<ol class="breadcrumb">';

		// Output the first ancestor (the site homepage)
		echo '<li><a href="' . get_home_url() . '" title="' . $homepage_title . '">' . $homepage_title . '</a></li>';

		// If the current page is an archive page, but isn't a category or tag listing
		if ( is_archive() && !is_tax() && !is_category() && !is_tag() ) {

			// removed $prefix argument from post_type_archive_title here
			// JG 3/9/2017
			echo '<li>' . post_type_archive_title( '', false ) . '</li>';

			// if the current page is an archive page and is a taxonomy term,
			// but isn't a category or a tag listing
		} else if ( is_archive() && is_tax() && !is_category() && !is_tag() ) {

			// what kind of post is it?
			$post_type = get_post_type();

			// If it is a custom post type display name and link
			if( $post_type != 'post' ) {

				$post_type_object = get_post_type_object( $post_type );
				$post_type_archive = get_post_type_archive_link( $post_type );

				echo '<li><a href="' . $post_type_archive . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';

			}

			$custom_tax_name = get_queried_object()->name;
			echo '<li>' . $custom_tax_name . '</li>';

			// But what if it's just a single page all by itself?
		} elseif ( is_singular( array( 'opportunity', ) ) ) {

			echo '<li><a href="' . get_the_permalink( get_page_by_title( 'opportunities' ) ) . '" title="' .
			     get_the_title( get_page_by_title( 'opportunities'	) ) . '">' . get_the_title( get_page_by_title( 'opportunities'	) ) . '</a></li>';

			echo '<li>' . $post->post_title . '</li>';

			// But what if it's just a single page all by itself?
		} else if ( is_single() ) {

			// What kind of post is it?
			$post_type = get_post_type();

			// If it is a custom post type display name and link
			if($post_type != 'post') {

				$post_type_object = get_post_type_object( $post_type );
				$post_type_archive = get_post_type_archive_link( $post_type );

				echo '<li><a href="' . get_permalink( get_option( 'page_for_posts' ) ) . '">' . get_the_title( get_option( 'page_for_posts' ) ) . '</a></li><li><a href="' . $post_type_archive . '" title="' . $post_type_object->labels->name . '">' . $post_type_object->labels->name . '</a></li>';

			}

			// Get post category info
			$category = get_the_category();

			if( !empty( $category ) ) {

				// Get last category post is in
				$last_category = end( $category );

				// Get parent any categories and create array
				$get_cat_parents = rtrim( get_category_parents( $last_category->term_id, true, ',' ) , ',' );
				$cat_parents = explode( ',' , $get_cat_parents );

				// Loop through parent categories and store in variable $cat_display
				$cat_display = '';
				foreach( $cat_parents as $parents ) {
					$cat_display .= '<li>' . $parents . '</li>';
				}

			}

			// If it's a custom post type within a custom taxonomy
			$taxonomy_exists = taxonomy_exists( $custom_taxonomy );
			if( empty( $last_category ) && !empty( $custom_taxonomy ) && $taxonomy_exists ) {

				$taxonomy_terms = get_the_terms( $post->ID, $custom_taxonomy );
				$cat_id         = $taxonomy_terms[0]->term_id;
				$cat_link       = get_term_link( $taxonomy_terms[0]->term_id, $custom_taxonomy );
				$cat_name       = $taxonomy_terms[0]->name;

			}

			// Check if the post is in a category
			if( !empty( $last_category ) ) {
				echo $cat_display;
				echo '<li>' . get_the_title() . '</li>';

				// Else if post is in a custom taxonomy
			} else if( !empty( $cat_id ) ) {

				echo '<li>><a href="' . $cat_link . '" title="' . $cat_name . '">' . $cat_name . '</a></li>';
				echo '<li>' . get_the_title() . '</li>';

			} else {

				echo '<li>' . get_the_title() . '</li>';

			}

		} else if ( is_category() ) {

			// Category page
			echo '<li>' . single_cat_title( '', false ) . '</li>';

		} else if ( is_page() ) {

			// Standard page
			if ( $post->post_parent ) {

				// If child page, get parents
				$ancestors = get_post_ancestors( $post->ID );

				// Rearrange the ancestors array so that we can
				// display them in parent > child order
				$ancestors = array_reverse( $ancestors );

				if ( ! isset( $parents ) ) {
					$parents = null;
				}
				foreach ( $ancestors as $ancestor ) {
					echo '<li><a href="' . get_permalink( $ancestor ) . '">' . get_the_title( $ancestor ) . '</a></li>';
				}

				// Only now can we display the current page
				echo '<li>' . get_the_title() . '</li>';

			} else {

				// Just display the current page title
				echo '<li>' . get_the_title() . '</li>';

			}
		} else if ( is_home() ) {

			$posts_page = get_option( 'page_for_posts' );

			if ( is_null( $posts_page ) ) {
				return;
			} else {
				$title = get_post( $posts_page )->post_title;

				echo '<li>' . $title . '</li>';
			}

		} else if ( is_tag() ) {


			// Get tag information
			$term_id        = get_query_var( 'tag_id' );
			$taxonomy       = 'post_tag';
			$args           = 'include=' . $term_id;
			$terms          = get_terms( $taxonomy, $args );
			$term_name  = $terms[0]->name;

			// Display the tag name
			echo '<li>' . $term_name . '</li>';

			// Roll out all the ancestors of a daily archive page
		} elseif ( is_day() ) {

			// Day archive

			// Year link
			echo '<li><a href="' . get_year_link( get_the_time( 'Y' ) ) . '">' . get_the_time( 'Y' ) . ' Archives</a></li>';

			// Month link
			echo '<li><a href="' . get_month_link( get_the_time( 'Y' ), get_the_time( 'm' ) ) . '">' . get_the_time( 'M' ) . ' Archives</a></li>';

			// Day display
			echo '<li>' . get_the_time( 'jS' ) . ' ' . get_the_time( 'M' ) . ' Archives</li>';

			// Roll out all the ancestors of a monthly archive page
		} else if ( is_month() ) {

			// Year link
			echo '<li><a href="' . get_year_link( get_the_time( 'Y' ) ) . '">' . get_the_time( 'Y' ) . ' Archives</a></li>';

			// Month display
			echo '<li>' . get_the_time( 'M' ) . ' Archives</li>';

			// And this is just for year archive pages
		} else if ( is_year() ) {

			echo '<li>' . get_the_time( 'Y' ) . ' Archives</li>';

			// This is how we display an author page
		} else if ( is_author() ) {

			// Get the author information
			global $author;
			$userdata = get_userdata( $author );

			// Display author name
			echo '<li>' . 'Author: ' . $userdata->display_name . '</li>';

		} else if ( get_query_var( 'paged' ) ) {

			// Paginated archives
			echo '<li>'.__( 'Page' ) . ' ' . get_query_var( 'paged' ) . '</li>';

		} else if ( is_search() ) {

			// Search results page
			echo '<li>Search results for &ldquo;' . get_search_query() . '&rdquo;</li>';

		} elseif ( is_404() ) {

			// 404 page
			echo '<li>' . '404: Page not found' . '</li>';
		}

		echo '</ol>';
	}
}
