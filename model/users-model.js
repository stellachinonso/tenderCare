const { promises } = require("fs");
const mySql = require("mysql");
const pool = mySql.createPool({
  connectionLimit: 10,
  host: "localhost",
  password: "1234",
  user: "root",
  database: "tenderCare",
});
function checkConnection() {
  return new Promise((resolve, reject) => {
    pool.connectDB((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}
function queryValues(connect, sqlQuery, values) {
  return new Promise((resolve, reject) => {
    connect.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const userSignup = "insert into user_database(fullName,email,password)values(?,?,?)"

module.exports = {checkConnection, queryValues, userSignup}