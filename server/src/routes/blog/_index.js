import express from 'express';
import { PageProps } from '#classes/props';
import { findArticle, PostsProps } from "./controller.js";
const router = express.Router();

router.get('/', (req, res, next) => {
  const props = new PageProps("My Blog");
  res.render('blog/index.pug', { 
    props,
  });
});

router.get("/posts", (req, res, next) => { 
  const props = new PostsProps("Blog Posts");
  res.render("blog/posts/_index.pug", {
    props,
  });
});

router.get("/posts/:slug", (req, res, next) => {
  const { slug } = req.params;
  const article = findArticle(slug);

  if (!article) {
    next(new Error("No article exists for this link."));
  }

  const props = new PageProps(article.title);
  res.render(`blog/posts/${slug}`, {
    props
  })
});

export default router;
