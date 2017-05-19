<?php
/**
 * Template Name: Fotos Page
 *
 * @package WordPress
 * @subpackage Iyengar Brasil
 * @since Iyengar Brasil 1.0
 */

function timber_post($single) {
  return new TimberPost($single);
}

function make_album($term) {
  $albums = array_map('timber_post', get_posts(array(
    'posts_per_page' => -1,
    'post_type' => 'album',
    'tax_query' => array(
      array(
        'taxonomy' => 'evento',
        'field' => 'term_id',
        'terms' => $term->term_id,
      )
    )
  )));
  return [$term->name, $albums];
}

$context = Timber::get_context();
$post = new TimberPost();
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$album_groups = array_map('make_album', get_terms(array(
  'taxonomy' => 'evento',
  'orderby' => 'date',
  'order' => 'ASC'
)));
$context['album_groups'] = $album_groups;
$context['post'] = $post;
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
