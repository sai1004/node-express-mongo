const Post = require("../models/post");

exports.getPosts = (req, res) => {
  res.json({
    data: [
      {
        title: "my first post",
        body: "hello world"
      },
      {
        title: "my second post",
        body: "hello world"
      }
    ]
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  // console.log("Creating Post:", req.body);
  post.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      res.status(200).json({
        post: result
      });
    }
  });
};
