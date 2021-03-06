import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Comment from '../models/Comment.js';

export default Router()
  .post('/api/v1/comments', ensureAuth, async (req, res, next) => {
    Comment.insert({ ...req.body, commentBy: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/api/v1/comments/:id', ensureAuth, async (req, res, next) => {
    Comment.deleteItem(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
