<?php
/**
 * Template Name: Activities Page
 *
 * @package WordPress
 * @subpackage Iyengar Brasil
 * @since Iyengar Brasil 1.0
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['posts'] = index_loop('atividade');

Timber::render('page-activities.twig', $context );
