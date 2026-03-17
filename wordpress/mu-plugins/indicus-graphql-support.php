<?php
/**
 * Plugin Name: Indicus GraphQL Support
 * Description: Registers custom post types and taxonomies with WPGraphQL for headless CMS.
 * Version: 1.0.0
 *
 * INSTALLATION:
 * Upload this file to: wp-content/mu-plugins/indicus-graphql-support.php
 */

if (!defined('ABSPATH')) exit;

/**
 * Register the "color" CPT with WPGraphQL.
 * This hooks into the existing CPT and adds GraphQL support.
 */
add_action('init', function () {
    // Only modify if the color CPT exists but isn't in GraphQL
    $cpt = get_post_type_object('color');
    if ($cpt && empty($cpt->show_in_graphql)) {
        $cpt->show_in_graphql     = true;
        $cpt->graphql_single_name = 'colour';
        $cpt->graphql_plural_name = 'colours';
    }

    // Register custom taxonomies with GraphQL (if not already)
    $taxonomy_map = [
        'colour-category'      => ['colourCategory', 'colourCategories'],
        'temperature'          => ['temperature', 'temperatures'],
        'tonality'             => ['tonality', 'tonalities'],
        'application-area'     => ['applicationArea', 'applicationAreas'],
        'product-type'         => ['productType', 'productTypes'],
        'application-surface'  => ['applicationSurface', 'applicationSurfaces'],
        'finish'               => ['finish', 'finishes'],
    ];

    foreach ($taxonomy_map as $tax_name => [$single, $plural]) {
        $tax = get_taxonomy($tax_name);
        if ($tax && empty($tax->show_in_graphql)) {
            $tax->show_in_graphql     = true;
            $tax->graphql_single_name = $single;
            $tax->graphql_plural_name = $plural;
        }
    }
}, 20); // Priority 20 to run after CPT/taxonomy registration

/**
 * Expose the color_code post meta to GraphQL.
 */
add_action('graphql_register_types', function () {
    register_graphql_field('Colour', 'colorCode', [
        'type'        => 'String',
        'description' => 'Hex color code for this colour swatch',
        'resolve'     => function ($post) {
            return get_post_meta($post->databaseId, 'color_code', true) ?: '';
        },
    ]);
});

/**
 * Enable ACF field groups for GraphQL.
 * This ensures all ACF field groups show in WPGraphQL.
 *
 * NOTE: After uploading this file, go to WordPress Admin > Custom Fields > Field Groups,
 * edit each field group, and under Settings enable "Show in GraphQL" and set a
 * "GraphQL Field Name" (e.g., "productFields" for the product fields group).
 *
 * Alternatively, this filter auto-enables it for all field groups:
 */
add_filter('acf/rest_api/field_settings/show_in_graphql', '__return_true');
