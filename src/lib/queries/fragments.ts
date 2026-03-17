export const MEDIA_FRAGMENT = `
  fragment MediaFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const TAXONOMY_FRAGMENT = `
  fragment TaxonomyFields on TermNode {
    name
    slug
    termTaxonomyId
    count
  }
`;
