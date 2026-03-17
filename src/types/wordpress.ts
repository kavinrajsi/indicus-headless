// ─── Media ────────────────────────────────────────────
export interface MediaItem {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

// ─── Taxonomy Terms ──────────────────────────────────
export interface TaxonomyNode {
  name: string;
  slug: string;
  termTaxonomyId?: number;
  count?: number;
}

export interface ColourCategory extends TaxonomyNode {
  colourCategoryFields?: {
    categoryColourHex?: string; // hex string like "#9c624b"
    categoryImage?: {
      sourceUrl: string;
      altText: string;
    };
  };
}

// ─── ACF Field Groups ────────────────────────────────
export interface ProductFeature {
  feature: string;
}

export interface ProductImageWithDescription {
  image: {
    sourceUrl: string;
    altText: string;
  };
  iconImage?: {
    sourceUrl: string;
    altText: string;
  };
}

export interface ProductDetailFeature {
  image: {
    sourceUrl: string;
    altText: string;
  };
  title: string;
  description: string;
}

export interface ProductACF {
  subHeading?: string;
  bannerColor?: string;
  productDownload?: {
    mediaItemUrl: string;
  };
  shadeCard?: {
    mediaItemUrl: string;
  };
  amazonUrl?: string;
  features?: ProductFeature[];
  imageWithDescription?: ProductImageWithDescription[];
  detailsFeatureIconText?: ProductDetailFeature[];
  imageSection?: {
    sourceUrl: string;
    altText: string;
  };
  guide?: {
    mediaItemUrl: string;
  };
  info?: string;
}

// ─── Posts ────────────────────────────────────────────
export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage?: MediaItem;
  categories?: {
    nodes: TaxonomyNode[];
  };
  tags?: {
    nodes: TaxonomyNode[];
  };
}

// ─── Products ────────────────────────────────────────
export interface Product {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: MediaItem;
  productFields?: ProductACF;
  // GraphQL returns singular names for these taxonomies
  applicationArea?: {
    nodes: TaxonomyNode[];
  };
  productType?: {
    nodes: TaxonomyNode[];
  };
  applicationSurface?: {
    nodes: TaxonomyNode[];
  };
  finish?: {
    nodes: TaxonomyNode[];
  };
}

// ─── Colors ──────────────────────────────────────────
export interface Color {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  colorFields?: {
    colorCode: string;
  };
  colourCategories?: {
    nodes: ColourCategory[];
  };
  temperatures?: {
    nodes: TaxonomyNode[];
  };
  tonalities?: {
    nodes: TaxonomyNode[];
  };
}

// ─── Homepage ACF ────────────────────────────────────
export interface HomepageSlide {
  sliderImage: {
    sourceUrl: string;
    altText: string;
  };
  mobileImage: {
    sourceUrl: string;
    altText: string;
  };
  sliderTitle: string;
  sliderButtonLink: string;
}

export interface HomeVideoItem {
  homePageStoriesVideoId: string;
}

// ─── Menus ───────────────────────────────────────────
export interface MenuItem {
  id: string;
  label: string;
  uri: string;
  parentId: string | null;
  childItems?: {
    nodes: MenuItem[];
  };
}

// ─── Page Info (Pagination) ──────────────────────────
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

// ─── GraphQL Response Wrappers ───────────────────────
export interface PostsResponse {
  posts: {
    nodes: Post[];
    pageInfo: PageInfo;
  };
}

export interface ProductsResponse {
  products: {
    nodes: Product[];
    pageInfo: PageInfo;
  };
}

export interface ColorsResponse {
  colors: {
    nodes: Color[];
    pageInfo: PageInfo;
  };
}
