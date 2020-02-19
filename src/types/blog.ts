export interface IBlog {
  node: {
    fields: {
      slug: string
    },
    frontmatter: {
      title: string,
      description: string,
      date: string,
      tags: string[],
      featuredimage_alt: string,
      featuredimage?: {
        childImageSharp: {
          fluid: any,
        }
      }
    }
  },
}