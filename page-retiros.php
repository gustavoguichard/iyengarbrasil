<?php
/**
 * Template Name: Retiros Page
 *
 * @package WordPress
 * @subpackage Iyengar Brasil
 * @since Iyengar Brasil 1.0
 */

function timber_post($single) {
  return new TimberPost($single);
}

$context = Timber::get_context();
$post = new TimberPost();
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$retiros = array_map('timber_post', get_posts(array(
  'post_type' => 'post',
  'category_name' => 'retiros',
  'orderby' => 'date',
  'order' => 'DESC'
)));
$context['retiros'] = $retiros;
$context['post'] = $post;
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
