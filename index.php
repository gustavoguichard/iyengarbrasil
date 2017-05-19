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

function timber_post($single) {
  return new TimberPost($single);
}

$context = Timber::get_context();
$post = new TimberPost('home');
$sections_top = array_map('timber_post', ['centro']);
$sections_bottom = array_map('timber_post', ['aulas-regulares', 'contato']);
$context['sections_top'] = $sections_top;
$context['sections_bottom'] = $sections_bottom;
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$context['menu'] = new TimberMenu('home-main-menu');
$context['post'] = $post;
$args = 'post_type=post&numberposts=-1&category__not_in=1&orderby=date';
$posts = Timber::get_posts($args);
array_push($posts, new TimberPost('retiros'));
$context['posts'] = $posts;
$templates = array( 'index.twig' );
if ( is_home() ) {
	array_unshift( $templates, 'home.twig' );
}
Timber::render( $templates, $context );
