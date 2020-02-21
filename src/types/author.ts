export interface IEuropeanenAuthor {
  frontmatter: {
    name: string,
    job_title?: string,
    profile_picture: {
      childImageSharp: {
        original: {
          src: string
        }
      }
    },
  },
}