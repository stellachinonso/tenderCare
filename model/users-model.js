const mySql = require("mysql2");
const pool = mySql.createPool({
  connectionLimit: 10,
  host: "localhost",
  password: "1234",
  user: "root",
  database: "tenderCare",
});

function checkConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) {
        reject(err);
      } else {
        resolve(connect);
      }
    });
  });
}
function queryValues(connection, sqlQuery, values) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const userSignup = "insert into users_data(fullName,email,password)values(?,?,?)"
const userLogin = "select * from users_data where email = ?";
const userResetPassword = "update users_data set password = ? where email = ?"
const createChildData = "insert into childs_BioData(fullname,gender,dob,userEmail)values(?,?,?,?)"
const fetchChildData = "select * from childs_BioData where  userEmail = ? AND  dob = ?" ;

module.exports = {
  checkConnection,
  queryValues,
  userSignup,
  userLogin,
  userResetPassword,
  createChildData,
  fetchChildData,
};