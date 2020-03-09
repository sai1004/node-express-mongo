exports.getPosts = (req, res) => {
  // res.send("Hello, I'm From Post Controller!");
  res.json({
    posts: [
      {
        title: "My First Post",
        description: "Hello world!, How are you all?"
      },
      {
        title: "My First Post",
        description: "Hello world!, How are you all?"
      }
    ]
  });
};
