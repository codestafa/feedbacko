const Comment = require("../models/Comments");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        commenter: req.user.id,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    let comment = await Comment.findById({ _id: req.params.id });
    try {
      await comment.remove({ _id: req.params.id });
      console.log("Deleted comment");
      res.redirect("/post/" + `${comment.post}`);
    } catch (err) {
      res.redirect("/post/" + `${comment.post}`);
    }
  },
};
