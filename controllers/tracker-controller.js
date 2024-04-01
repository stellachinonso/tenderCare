const {
  checkConnection,
  queryValues,
  childData,
} = require("../model/users-model");

const devTracker = async (req, res) => {
  const data = {
    fullname: req.body.fullname,
    gender: req.body.gender,
    dob: req.body.dob,
    userEmail: req.body.userEmail,
  };

  const connection = await checkConnection();
  try {
    const createChildData = await queryValues(connection, childData, [
      data.fullname,
      data.gender,
      data.dob,
      data.userEmail,
    ]);
    console.log(createChildData);
    res.status(200);

    const childsDOB = new Date(data.dob);
    const curentDate = new Date();
    const ageDif = curentDate.getTime() - childsDOB.getTime();
    const ageInWeeks = Math.floor(ageDif / (1000 * 60 * 60 * 24 * 7));
    console.log(`Your child's age is ${ageInWeeks} weeks old.`);
    res
      .status(200)
      .json({ message: `Your child's age is ${ageInWeeks} weeks old.` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { devTracker };
