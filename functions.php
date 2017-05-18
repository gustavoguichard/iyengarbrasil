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

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
    remove_filter( 'the_content', 'wpautop' );
    add_filter( 'the_content', 'wpautop' , 15);
    add_filter( 'use_default_gallery_style', '__return_false' );
    add_filter( 'timber_context', array( $this, 'add_to_context' ) );
    add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
    add_action( 'init', array( $this, 'register_post_types' ) );
    add_action( 'init', array( $this, 'register_taxonomies' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'add_theme_styles') );
    add_action( 'wp_enqueue_scripts', array( $this, 'add_theme_scripts') );
    remove_shortcode('gallery');
    add_shortcode('gallery', array( $this, 'parse_gallery_shortcode') );
    add_shortcode('painel', array( $this, 'accordeon_cb' ) );
    add_shortcode('aba', array( $this, 'accordeon_section_cb' ) );
    add_shortcode('citacao', array( $this, 'blockquote_cb' ) );
		parent::__construct();
	}

  function accordeon_cb($atts, $content = null) {
    return '<div class="accordeon">' . do_shortcode($content) .'</div>';
  }

  function blockquote_cb($atts, $content = null) {
    extract(shortcode_atts(array(
      "autor" => '' // default URL
    ), $atts));
    return '<blockquote class="blockquote">
              <p>' . $content . '</p>
              <footer class="blockquote-footer">'. $autor . '</footer>
            </blockquote>';
  }

  function accordeon_section_cb($atts, $content = null) {
    extract(shortcode_atts(array(
      "titulo" => '' // default URL
    ), $atts));
    return '<article class="acd-section">
              <header class="acd-header">'.$titulo.'</header>
                <div class="acd-content">'.$content.'</div>
              </header>
            </article>';
  }

  function add_theme_styles() {
    if(!$this->is_dev()) {
      wp_enqueue_style( 'iyengar_styles', get_template_directory_uri() . '/css/main.css' );
    }

    if(is_single()) {
      wp_enqueue_style( 'iyengar_styles', get_template_directory_uri() . '/js/vendor/jquery.fancybox.min.css' );
    }
  }

  function add_theme_scripts() {
    if(is_single()) {
      wp_enqueue_script( 'fancybox', get_template_directory_uri() . '/js/vendor/jquery.fancybox.min.js', array('jquery'), '1.0.0', true );
    }

    $folder = ($this->is_dev() ? '/src' : '/js');
    wp_enqueue_script( 'iyengar_main', get_template_directory_uri() . $folder . '/main.bundle.js', array('jquery'), '1.0.0', true );
  }

  function is_dev() {
    $url = get_site_url();
    return (substr( $url, 0, 16 ) === "http://localhost");
  }

  function register_post_types() {
    //this is where you can register custom post types
  }

  function register_taxonomies() {
    //this is where you can register custom taxonomies
  }

  function add_to_context( $context ) {
    // $context['foo'] = 'bar';
    // $context['stuff'] = 'I am a value set in your functions.php file';
    // $context['notes'] = 'These values are available everytime you call Timber::get_context();';
    $context['menu'] = new TimberMenu('main-menu');
    $context['site'] = $this;
    return $context;
  }

  function myfoo( $text ) {
    $text .= ' bar!';
    return $text;
  }

  function add_to_twig( $twig ) {
    /* this is where you can add your own functions to twig */
    $twig->addExtension( new Twig_Extension_StringLoader() );
    $twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
    return $twig;
  }

  function parse_gallery_shortcode($atts) {
    if ( ! empty( $atts['ids'] ) ) {
      if ( empty( $atts['orderby'] ) )
        $atts['orderby'] = 'post__in';
      $atts['include'] = $atts['ids'];
    }

    extract(shortcode_atts(array(
      'orderby' => 'menu_order ASC, ID ASC',
      'include' => '',
      'id' => $post->ID,
    ), $atts));

    $args = array(
      'post_type' => 'attachment',
      'post_status' => 'inherit',
      'post_mime_type' => 'image',
      'orderby' => $orderby
    );

    // if ( !empty($include) )
    $args['include'] = $include;
    // else {
    //   $args['post_parent'] = $id;
    //   $args['numberposts'] = -1;
    // }

    $images = get_posts($args);
    $template = '<div class="album-container">';
    foreach ( $images as $image ) {
      $caption = $image->post_excerpt;
      $thumb = wp_get_attachment_image_src($image->ID, 'thumbnail');
      $photo = wp_get_attachment_image_src($image->ID, 'full');
      $image_alt = get_post_meta($image->ID,'_wp_attachment_image_alt', true);
      $template .= '<a data-fancybox="gallery" data-caption="'. $caption .'" ';
      $template .= 'data-width="' . $photo[1] . '" ';
      $template .= 'data-height="' . $photo[2] . '" ';
      $template .= 'href="' . $photo[0] . '"><img class="photo" ';
      $template .= 'src="'. $thumb[0] . '" width="150" height="150"></a>';
    }
    return $template . '</div>';
  }

}

new StarterSite();
