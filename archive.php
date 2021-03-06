<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array( 'archive.twig', 'index.twig' );

$context = Timber::get_context();

$context['title'] = 'Archive';
if ( is_category() ) {
  $context['title'] = single_cat_title( '', false );
  $context['post'] = new TimberTerm(get_the_category()[0]);
  array_unshift( $templates, 'archive-' . get_query_var( 'cat' ) . '.twig', 'archive-' . get_post_type() . '.twig'
);
} else if ( is_post_type_archive() ) {
  $context['title'] = post_type_archive_title( '', false );
  array_unshift( $templates, 'archive-' . get_post_type() . '.twig' );
}
$context['posts'] = Timber::get_posts();

Timber::render( $templates, $context );
