<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

function timber_image($image) {
  return new TimberImage($image);
}

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$context['gallery'] = array_map('timber_image', acf_photo_gallery('album_photos', $post->ID));

Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
