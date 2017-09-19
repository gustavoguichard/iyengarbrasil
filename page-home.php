<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage Iyengar Brasil
 * @since Iyengar Brasil 1.0
 */

require_once(get_template_directory().'/facebook-settings.php');
global $fb;
if(current_user_can('publish_posts') && !isset($_SESSION['facebook_access_token']) && isset($fb)) {
  $helper = $fb->getRedirectLoginHelper();
  $_SESSION['FBRLH_state'] = $_GET['state'];
  $permissions = ['email'];
  $loginUrl = isset($_GET['facebook_data']) ? null : $helper->getLoginUrl(get_option('siteurl').'/login-callback/', $permissions);
}
$string = file_get_contents(get_template_directory().'/data/facebook.json');

$context = Timber::get_context();
$post = new TimberPost();
$sections = array_map('timber_post', ['atividades', 'horarios', 'contato']);
$context['sections'] = $sections;
$context['post'] = $post;
$context['posts'] = index_loop();
$context['top_images'] = images_array($post, 'top_slider_images');
$context['facebook_json'] = json_decode($string, true);
$context['login_url'] = $loginUrl;
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
