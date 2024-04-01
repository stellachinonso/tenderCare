const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
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
    console.log(`${data.fullname} age is ${ageInWeeks} weeks old.`);

    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
    });

    const prompt = `Say 'Hi' to me before responding and do not include "Certainly" before responding to my question.
    My child name is ${data.fullname}, child's gender is ${data.gender} and ${ageInWeeks} weeks old. Give me the development of my child's age?
    End your statement with "Remember that every child develops at their own pace.Do you have any other concerns about your child's development?`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.send(response.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { devTracker };
