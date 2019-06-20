let login = (req, res) => {
  let data = req.body;
  User.findOne({
    email: data.email
  })
    .then(user => {
      if (!user) {
        res.json("No user with this email");
        return;
      }
      bcrypt.compare(data.password, user.password, (err, response) => {
        if (response) {
          let access = "auth";
          let token = jwt
            .sign(
              {
                _id: user._id.toHexString(),
                access
              },
              secretSalt
            )
            .toString();
          user.tokens.push({
            access,
            token
          });
          user.save().then(useris => {
            res.header("x-auth", token).json(useris);
          });
        } else {
          res.json("incorrect password");
        }
      });
    })
    .catch(e => res.status(400).json(e));
};
