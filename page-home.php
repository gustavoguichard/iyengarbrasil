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
$section_names = $context['is_english'] ? ['activities', 'schedule', 'contact'] : ['atividades', 'horarios', 'contato'];
$sections = array_map('timber_post', $section_names);
$context['sections'] = $sections;
$context['post'] = $post;
$context['posts'] = index_loop();
$context['top_images'] = images_array($post, 'top_slider_images');
$context['login_url'] = $loginUrl;
Timber::render( array( 'page-home.twig', 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
