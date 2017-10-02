<?php
/**
 * @package WordPress
 * @subpackage Zen

 Template Name: Facebook Login

*/

require_once(get_template_directory().'/facebook-settings.php');;

global $fb;

function write_data_to_file( $data, $filename ) {
  $fileUrl = get_template_directory().'/data/'.$filename.'.json';
  $myFile = fopen($fileUrl, 'w') or die('Unable to open file: '.$fileUrl);
  fwrite($myFile, $data) or die('Unable to write file: '.$fileUrl);
  fclose($myFile) or die('Unable to close file: '.$fileUrl);
}


if(isset($fb) && current_user_can( 'publish_posts' ) && isset($_REQUEST['code'])) {
  try {
    echo('Carregando novas fotos...');
    $token = $fb->getRedirectLoginHelper()->getAccessToken();
  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }

  if (isset($token)) {
    $pageUrl = '245824325471632';
    $response = $fb->get($pageUrl.'?fields=albums{photos{name,images},name,place,cover_photo}', $token);
    write_data_to_file($response->getGraphNode(), 'facebook');
    echo '<meta http-equiv="refresh" content="0;url='.get_option("siteurl").'?facebook_data=updated">';
  }
}

?>
