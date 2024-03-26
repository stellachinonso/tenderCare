const {
  checkConnection,
  queryValues,
  userSignup,
} = require("../model/users-model");

const signup = async (req, res) => {
  const user = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  };
  const connection = await checkConnection();
  try {
    const result = await queryValues(connection, userSignup, [
      user.fullname,
      user.email,
      user.password,
    ]);
    res.status(201).json({ mesaage: "User created Successfully", result });
  } catch (err) {
    res.satus(400).json(err);
    console.log(err);
  }
};
module.exports = { signup }
