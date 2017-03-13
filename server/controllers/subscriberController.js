import db from './../models';

const subscriberController = {};

subscriberController.post = (req, res) => {
  const { email } = req.body;

  // Validation

  const subscriber = new db.Subscriber({
    email,
  });

  subscriber.save()
    .then((newSubscriber) => {
      res.status(200).json({
        success: true,
        data: newSubscriber,
      });
    }).catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
}

export default subscriberController;
