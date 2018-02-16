<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = ['templates', 'views'];

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
    add_filter( 'use_default_gallery_style', '__return_false' );
    add_filter( 'tablepress_use_default_css', '__return_false' );
    add_filter( 'timber_context', [$this, 'add_to_context']);
    add_filter( 'get_twig', [$this, 'add_to_twig']);
    add_filter('the_content', [$this, 'wpex_fix_shortcodes']);
    add_filter('post_gallery', [$this, 'parse_gallery_shortcode'], 10, 2);
    add_filter( 'wp_default_scripts', [$this, 'dequeue_jquery_migrate']);
    add_action('init', [$this, 'iyengar_unregister_tags']);
    add_action( 'init', [$this, 'change_post_object_label']);
    add_action( 'admin_menu', [$this, 'change_post_menu_label']);
    add_action( 'init', [$this, 'register_post_types']);
    add_action( 'init', [$this, 'register_taxonomies']);
    add_action( 'admin_menu', [$this, 'remove_menus']);
    add_action( 'wp_enqueue_scripts', [$this, 'add_theme_styles']);
    add_action( 'wp_enqueue_scripts', [$this, 'add_theme_scripts']);
    add_shortcode('painel', [$this, 'accordeon_cb']);
    add_shortcode('aba', [$this, 'accordeon_section_cb']);
    add_shortcode('video', [$this, 'video_cb']);
    add_shortcode('citacao', [$this, 'blockquote_cb']);

    parent::__construct();
  }

  function remove_menus() {
    remove_menu_page( 'edit-comments.php' );
  }

  function iyengar_unregister_tags() {
    unregister_taxonomy_for_object_type('post_tag', 'post');
  }

  function wpex_fix_shortcodes($content){
    $array = array (
      '<p>[' => '[',
      ']</p>' => ']',
      ']<br />' => ']'
    );
    $content = strtr($content, $array);
    return $content;
  }

  function accordeon_cb($atts, $content = null) {
    return '<div class="accordeon" :class="{ desktop: !mobile, mobile: mobile }">'
        . do_shortcode($content)
        . '<div v-if="!mobile" class="acd-dynamic-content" v-html="currentContent"></div>
        </div>';
  }

  function video_cb($atts, $content = null) {
    return '<div class="row">
              <div class="columns seven">
                <div class="responsive-video">
                ' . $content . '
                </div>
              </div>
            </div>';
  }

  function blockquote_cb($atts, $content = null) {
    extract(shortcode_atts(array("autor" => ''), $atts));
    return '<blockquote class="blockquote">
              <p>' . $content . '</p>
              <footer class="blockquote-footer">'. $autor . '</footer>
            </blockquote>';
  }

  function accordeon_section_cb($atts, $content = null) {
    extract(shortcode_atts(array("titulo" => ''), $atts));
    return '<accordeon-section content="'.htmlspecialchars($content, ENT_QUOTES).'" title="'.$titulo.'" :mobile="mobile" :current-title="currentTitle" @selected="changeActive"></accordeon-section>';
  }

  function add_theme_styles() {
    if(!$this->is_dev()) {
      wp_enqueue_style( 'iyengar_styles', get_template_directory_uri() . '/css/main.css' );
    }

    wp_enqueue_style( 'fancybox_styles', get_template_directory_uri() . '/js/vendor/jquery.fancybox.min.css' );
  }

  function add_theme_scripts() {
    wp_enqueue_script( 'fancybox', get_template_directory_uri() . '/js/vendor/jquery.fancybox.min.js', ['jquery'], '1.0.0', true );

    $folder = ($this->is_dev() ? '/src' : '/js');
    wp_enqueue_script( 'iyengar_main', get_template_directory_uri() . $folder . '/main.bundle.js', ['jquery'], '1.0.0', true );
  }

  function dequeue_jquery_migrate(&$scripts) {
    if(!is_admin()){
      $scripts->remove( 'jquery');
      $scripts->add( 'jquery', false, array( 'jquery-core' ), '1.12.4' );
    }
  }

  function is_dev() {
    $url = get_site_url();
    return (substr( $url, 0, 16 ) === "http://localhost");
  }

  function change_post_menu_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Atividades';
    $submenu['edit.php'][5][0] = 'Atividades';
    $submenu['edit.php'][10][0] = 'Adicionar Atividades';
    echo '';
  }

  function change_post_object_label() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Atividades';
    $labels->singular_name = 'Atividade';
    $labels->add_new = 'Adicionar Atividade';
    $labels->add_new_item = 'Adicionar Atividade';
    $labels->edit_item = 'Editar Atividades';
    $labels->new_item = 'Atividade';
    $labels->view_item = 'Ver Atividade';
    $labels->search_items = 'Buscar Atividades';
    $labels->not_found = 'Nenhuma Atividade encontrada';
    $labels->not_found_in_trash = 'Nenhuma Atividade na Lixeira';
  }

  function register_post_types() {
  }

  function register_taxonomies() {
  }

  function add_to_context( $context ) {
    $is_english = get_locale() === 'en_US';
    $menu_suffix = $is_english ? 'main-menu-en' : 'main-menu';
    $menu_name = is_front_page() ? 'home-' . $menu_suffix : $menu_suffix;
    $context['menu'] = new TimberMenu($menu_name);
    $context['is_english'] = $is_english;
    $context['site'] = $this;
    return $context;
  }

  function make_gallery($id, $field) {
    return array_map(
      'timber_image',
      acf_photo_gallery($field, $id)
    );
  }

  function make_gallery_src($id, $field) {
    return array_map(
      'timber_image_src',
      acf_photo_gallery($field, $id)
    );
  }

  function add_to_twig( $twig ) {
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter('make_gallery', new Twig_SimpleFilter('make_gallery', [$this, 'make_gallery']));
    $twig->addFilter('make_gallery_src', new Twig_SimpleFilter('make_gallery_src', [$this, 'make_gallery_src']));
    return $twig;
  }

  function parse_gallery_shortcode($output, $attr) {
    global $post;

    if (isset($attr['orderby'])) {
      $attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
      if (!$attr['orderby'])
        unset($attr['orderby']);
    }

    extract(shortcode_atts(array(
      'order' => 'ASC',
      'orderby' => 'menu_order ID',
      'id' => $post->ID,
      'include' => '',
      'exclude' => ''
    ), $attr));

    $id = intval($id);
    if ('RAND' == $order) $orderby = 'none';

    if (!empty($include)) {
      $include = preg_replace('/[^0-9,]+/', '', $include);
      $_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));

      $attachments = [];
      foreach ($_attachments as $key => $val) {
        $attachments[$val->ID] = $_attachments[$key];
      }
    }

    if (empty($attachments)) return '';

    // Here's your actual output, you may customize it to your need
    $output = '<div class="album-container">';

    // Now you loop through each attachment
    foreach ($attachments as $id => $attachment) {
      // Fetch all data related to attachment
      $img = wp_prepare_attachment_for_js($id);

      // If you want a different size change 'large' to eg. 'medium'
      $url = $img['sizes']['full']['url'];
      $height = $img['sizes']['full']['height'];
      $width = $img['sizes']['full']['width'];
      $alt = $img['alt'];
      $thumb = $img['sizes']['thumbnail']['url'];

      // Store the caption
      $caption = $img['caption'];

      $output .= '<a data-fancybox="gallery" data-caption="'. $caption .'" ';
      $output .= 'data-width="' . $width . '" ';
      $output .= 'data-height="' . $height . '" ';
      $output .= 'href="' . $url . '"><img class="photo" ';
      $output .= 'src="'. $thumb . '" width="150" height="150" /></a>';
    }

    $output .= '</div>';

    return $output;
  }
}

function timber_image($image) {
  return new TimberImage($image);
}

function timber_image_src($image) {
  return timber_image($image)->src;
}

function timber_post($single) {
  return new TimberPost($single);
}

function index_loop() {
  $args = 'post_type=post&numberposts=-1&orderby=date&lang=' . get_locale();
  $posts = Timber::get_posts($args);
  return $posts;
}

function images_array($post, $field) {
  $top_style = get_post_meta($post->id, 'top_style', true );
  return array_map(
    'timber_image_src',
    acf_photo_gallery($field, $post->id)
  );
}

// =========================================================================
// REMOVE JUNK FROM HEAD
// =========================================================================
remove_action('wp_head', 'rsd_link'); // remove really simple discovery link
remove_action('wp_head', 'wp_generator'); // remove wordpress version
remove_action('wp_head', 'feed_links', 2); // remove rss feed links (make sure you add them in yourself if youre using feedblitz or an rss service)
remove_action('wp_head', 'feed_links_extra', 3); // removes all extra rss feed links
remove_action('wp_head', 'index_rel_link'); // remove link to index page
remove_action('wp_head', 'wlwmanifest_link'); // remove wlwmanifest.xml (needed to support windows live writer)
remove_action('wp_head', 'start_post_rel_link', 10, 0); // remove random post link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // remove parent post link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // remove the next and previous post links
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
// all actions related to emojis
remove_action( 'admin_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

new StarterSite();
