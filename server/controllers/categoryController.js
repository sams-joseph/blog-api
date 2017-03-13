import db from './../models';

const categoryController = {};

categoryController.post = (req, res) => {
  const {
    name,
  } = req.body;

  // Validation

  const category = new db.Category({
    name,
  });

  category.save()
    .then((newCategory) => {
      res.status(200).json({
        success: true,
        data: newCategory,
      });
    }).catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
}

categoryController.getAll = (req, res) => {
  db.Category.find({})
    .then((posts) => {
      return res.status(200).json({
        success: true,
        data: posts
      });
    }).catch((err) => {
      return res.status(500).json({
        message: err
      });
    });
}

export default categoryController;
