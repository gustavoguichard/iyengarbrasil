<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$place_id = '245824325471632';

function get_fb_image_by_size($photo, $size) {
  $valid_image = array_filter($photo['images'], function($image) use (&$size) {
    $regex = '/p'.$size.'x'.$size.'/';
    return(preg_match($regex, $image['source']));
  });
  if(empty($valid_image)) {
    return $photo['images'][0];
  }
  return(array_values($valid_image)[0]);
}

function get_fb_json() {
  $string = file_get_contents(get_template_directory().'/data/facebook.json');
  return json_decode($string, true);
}

function get_valid_albums() {
  $facebook_json = get_fb_json();
  return array_reverse(
    array_filter($facebook_json['albums'], function($album) {
      global $place_id;
      return($album['place']['id'] == $place_id);
    })
  );
}

function get_albums_array() {
  $size_medium = 320;
  $size_big = 480;
  $size_thumb = 130;

  $valid_albums = get_valid_albums();
  $albums_array = array();
  if ( !empty($valid_albums) ) {
    foreach($valid_albums as $album) {
      $cover_id = $album['cover_photo']['id'];
      if( !empty($cover_id) ) {
        $album_name = $album['name'];
        $index = array_search($cover_id, array_column($album['photos'], 'id'));
        $cover = get_fb_image_by_size($album['photos'][$index], $size_medium);
        $images = array();
        foreach ($album['photos'] as $photo) {
          $big_image = get_fb_image_by_size($photo, 0);
          $small_image = get_fb_image_by_size($photo, $size_thumb);
          array_push($images, array('legend' => $photo['name'], 'image' => $big_image['source'], 'thumb' => $small_image['source']));
        }
        array_push($albums_array, array('cover' => $cover, 'images' => $images, 'name' => $album_name, 'id' => $album['id']));
      }
    }
    return $albums_array;
  }
}

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['top_images'] = images_array($post, 'top_slider_images');
$context['albums'] = get_albums_array();
$context['album_id'] = $_GET['album_id'];
Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
