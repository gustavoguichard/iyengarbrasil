<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage Gisele de Menezes
 * @since Gisele de Menezes 3.0
 */

$context = Timber::get_context();
$post = new TimberPost();
$extra_sections = ['atividades', 'aulas-regulares', 'contato'];
$sections = [];
foreach($extra_sections as $section){
  array_push($sections, new TimberPost($section));
}
$context['sections'] = $sections;
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$context['menu'] = new TimberMenu('home-main-menu');
$context['post'] = $post;
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
