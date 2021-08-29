const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get("", async (req, res) => {
  try {
    const newsAPI = await axios.get("https://raddy.co.uk/wp-json/wp/v2/posts/");
    //console.log(newsAPI.data);
    res.render("news", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("news", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.require) {
      res.render("news", { articles: null });
      console.log(err.request);
    } else {
      res.render("news", { articles: null });
      console.log("Error", err.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let articleID = req.params.id;
  try {
    const newsAPI = await axios.get(
      `https://raddy.co.uk/wp-json/wp/v2/posts/${articleID}`
    );
    //console.log(newsAPI.data);
    res.render("newsSingle", { article: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newsSingle", { article: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.require) {
      res.render("newsSingle", { article: null });
      console.log(err.request);
    } else {
      res.render("newsSingle", { article: null });
      console.log("Error", err.message);
    }
  }
});

newsRouter.post("", async (req, res) => {
  let search = req.body.search;
  try {
    const newsAPI = await axios.get(
      `https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`
    );
    //console.log(newsAPI.data);
    res.render("newsSearch", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newsSearch", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.require) {
      res.render("newsSearch", { articles: null });
      console.log(err.request);
    } else {
      res.render("newsSearch", { articles: null });
      console.log("Error", err.message);
    }
  }
});

module.exports = newsRouter;
