import express from 'express';
import { PageProps } from '#classes/props.js';
const router = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index.pug', { title: 'Express' });
});

// GET about
router.get("/about", (req, res, next) => {
  const props = new PageProps("About me");
  res.render("about.pug", {
    props
  });
})

export default router;
