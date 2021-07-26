import { PageProps } from "#classes/props";

export const articlesList = [
  "svg-spritesheet"
];

class BlogArticle {
  /**
   * @param {string} title 
   */
  constructor(title) {
    this.title = title;
  }
}

export class PostsProps extends PageProps {
  /**
   * @param {string} title 
   */
  constructor(title) {
    super(title);
    this.articles = articlesList;
    this.findArticle = findArticle;
  }
}

/**
 * @type {{[slug: string]: BlogArticle}}
 */
const articlesTable = {
  "svg-spritesheet": new BlogArticle("SVG Spritesheet")
};

/**
 * @param {string} slug 
 */
export function findArticle(slug) {
  const article = articlesTable[slug];

  return article;
}
