const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    if (commentData.length === 0) {
      res
        .status(404)
        .json({ message: 'Would you believe there are NO comments ANYWHERE?' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    if (commentData.length === 0) {
      res
        .status(404)
        .json({ message: `There is no comment with id = ${req.params.id}` });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body, // which is really just comment_text and post_id - but a spreader is fancy
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedRows] = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedRows === 0) {
      res
        .status(404)
        .json({ message: `No comment found with id = ${req.params.id}` });
      return;
    }

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Bad request' });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedCommentRows = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedCommentRows === 0) {
      res.status(404).json({
        message: `No comment found with id = ${req.params.id}`,
      });
      return;
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
