import db from './../models';
import showdown from 'showdown';


const converter = new showdown.Converter();
const postController = {};

postController.post = (req, res) => {
  const {
    title,
    description,
    body,
    userId,
    categoryId,
  } = req.body;

  const post = new db.Post({
    title,
    description,
    body,
    _creator: userId,
    _category: categoryId,
  });

  post.save()
    .then((newPost) => {
      return res.status(200).json({
        success: true,
        data: newPost
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
};

postController.getAll = (req, res) => {
  db.Post.find({}).populate({
    path: '_creator',
    select: 'firstName lastName createdAt -_id'
  }).populate({
    path: '_category',
    select: 'name -_id',
    match:  { 'isDeleted': false }
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match:  { 'isDeleted': false }
  }).then((posts) => {
      return res.status(200).json({
        success: true,
        data: posts
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
};

postController.getPostById = (req, res) => {
  db.Post.find({ _id: req.params._id }).populate({
    path: '_creator',
    select: 'firstName lastName createdAt -_id'
  }).populate({
    path: '_category',
    select: 'name -_id',
    match:  { 'isDeleted': false }
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match:  { 'isDeleted': false }
  }).then((post) => {
      return res.status(200).json({
        success: true,
        data: post,
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
};

postController.getByCategory = (req, res) => {
  db.Post.find({ _category: req.params._categoryId }).populate({
    path: '_creator',
    select: 'firstName lastName createdAt -_id'
  }).populate({
    path: '_category',
    select: 'name -_id',
    match:  { 'isDeleted': false }
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match:  { 'isDeleted': false }
  }).then((posts) => {
      return res.status(200).json({
        success: true,
        data: posts
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
};

export default postController;
