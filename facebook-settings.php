<?php
require_once(get_template_directory().'/facebook-sdk-v5.6.1/autoload.php');
  if(!session_id()) {
    session_start();
  }
  if(!isset($fb) && current_user_can( 'publish_posts' )) {
    global $fb, $facebook_id, $facebook_secret;
    $facebook_id = get_custom('facebook_app_id');
    $facebook_secret = get_custom('facebook_app_secret');

    $fb = new Facebook\Facebook([
      'app_id' => $facebook_id,
      'app_secret' => $facebook_secret,
      'default_graph_version' => 'v2.10',
    ]);
  }
?>
