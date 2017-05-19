<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage Iyengar Brasil
 * @since Iyengar Brasil 1.0
 */

$context = Timber::get_context();
$post = new TimberPost();
$sections = array_map('timber_post', ['atividades', 'aulas-regulares', 'contato']);
$context['sections'] = $sections;
$context['slider_images'] = acf_photo_gallery('top_slider_images', $post->ID);
$context['menu'] = new TimberMenu('home-main-menu');
$context['post'] = $post;
$context['posts'] = index_loop();
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
