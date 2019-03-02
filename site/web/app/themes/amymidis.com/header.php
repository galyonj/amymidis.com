<?php
/**
 * Filename: header.php
 * Author: jgalyon
 * Created: 2019.01.25
 * Description:
 **/
?>

<!doctype html>
<html class="no-js" lang="<?php echo get_bloginfo( 'language' ); ?>">
<head>
	<meta charset="<?php echo get_bloginfo( 'charset' ); ?>">

	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="apple-touch-icon" href="<?php echo trailingslashit( get_template_directory_uri() ); ?>img/apple-touch-icon.png">

	<link rel="shortcut icon" href="<?php echo trailingslashit( get_template_directory_uri() ); ?>favicon.png" type="image/x-icon">

	<script src="<?php echo trailingslashit( get_template_directory_uri() ); ?>modernizr.js"></script>

	<!-- fontawesome -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

	<?php wp_head(); ?>

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','<?php echo get_option('google_tag_manager_id'); ?>');
	</script>
	<!-- End Google Tag Manager -->
</head>
<body data-scroll-id="page-top" id="page-top" <?php body_class(); ?>>
<!-- Google Tag Manager (noscript) -->
<noscript>
	<iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo get_option('google_tag_manager_id'); ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
<a href="#content" class="sr-only">Skip to content</a>
<a href="#" data-scroll class="scroll-top">
	<i class="fas fa-chevron-up"></i>
	<span class="sr-only">scroll to top of page</span>
</a>
<div class="wrapper">
	<header role="banner">
		<?php get_template_part( 'view/header', 'navbar'); ?>
	</header>
	<div class="content-wrapper">

