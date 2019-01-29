<?php
/**
 * Filename: functions.php
 * Author: jgalyon
 * Created: 2018/09/19
 * Description:
 * Do not write code directly to this file. Create functionally-specific files in the /inc directory in this theme directory, and those files will
 * be automatically included here.
 **/

$files = glob( get_template_directory() . '/inc/*.php' );

foreach( $files as $file ) include_once( $file );
