<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();
$args = 'post_type=post&numberposts=-1&category__not_in=1&orderby=date';
$post = new TimberPost('atividades');
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$context['post'] = $post;
$posts = Timber::get_posts($args);
array_push($posts, new TimberPost('retiros'));
$context['posts'] = $posts;
$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'home.twig' );
}
Timber::render( $templates, $context );
