import db from './../models';

const saltRounds = 10;

const userController = {};

userController.post = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
	req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();

  const errors = req.validationErrors();

  if(errors) {
    res.status(500).json({
      message: errors,
    });
  } else {
    const user = new db.User({
      firstName,
      lastName,
      email,
      password
    });

    user.createUser(user)
      .then((newUser) => {
        res.status(200).json({
            success: true,
            data: newUser,
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }
}

userController.login = (req, res) => {
  const { email, password } = req.body;

  db.User.findOne({ email: email }).then((user) => {
    bcrypt.compare(password, user.password).then((valid) => {
      if(valid) {
        res.status(200).json({
          success: true,
          loggedIn: true,
        });
      }
    }).catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
  }).catch((err) => {
    res.status(500).json({
      message: err,
    });
  });
}

export default userController;
