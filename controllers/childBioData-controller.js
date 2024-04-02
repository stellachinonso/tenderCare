// const OpenAI = require("openai");
// const dotenv = require("dotenv");
// dotenv.config();
// const {
//   checkConnection,
//   queryValues,
//   fetchChildData,
// } = require("../model/users-model");
// //include
// let userEmail = null;
// const dob = null;
// let initialPromptSent = false;

// const devTracker2 = async (req, res) => {
//   try {
//     if (!userEmail && !dob) {
//        userEmail = req.body.userEmail
//        dob = req.body.dob;

//       const connection = await checkConnection();
//       const childData = await queryValues(connection, fetchChildData, [
//         dob,
//         userEmail,
//       ]);
//       // console.log(createChild);
//       // res.status(200);

//       const childsDOB = new Date(childData.dob);
//       const curentDate = new Date();
//       const ageDif = curentDate.getTime() - childsDOB.getTime();
//       const ageInWeeks = Math.floor(ageDif / (1000 * 60 * 60 * 24 * 7));
//       console.log(`${childData.fullname} age is ${ageInWeeks} weeks old.`);

//       const initialPrompt = `Say 'Hi' to me before responding and do not include "Certainly" before responding to my question.
//     My child name is ${childData.fullname}, child's gender is ${childData.gender} and ${ageInWeeks} weeks old. Give me the development of my child's age?
//     End your statement with "Remember that every child develops at their own pace.Do you have any other concerns about your child's development?`;

//       const openai = new OpenAI({
//         apiKey: process.env.API_KEY,
//       });
//       const initialResponse = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: initialPrompt }],
//         temperature: 1,
//         max_tokens: 200,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });
//       const initailResponseData = initialResponse.choices[0].message.content;
//       res.status(200).send(initailResponseData);
//       // Set initialPromptSent to true
//       initialPromptSent = true;
//     } else {
//       // For subsequent requests, use the user's message as the prompt to OpenAI
//       const userMessage = req.body.userMessage;

//       // Send prompt to OpenAI
//       const openai = new OpenAI({ apiKey: process.env.API_KEY });
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: userMessage }],
//         temperature: 1,
//         max_tokens: 300,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });

//       const responseData = response.choices[0].message.content;

//       // Send response to user
//       res.status(200).send(responseData);
//     }

//     //  await user_prompt2()
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { devTracker2 };


const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const { checkConnection, queryValues } = require("../model/users-model");

let userEmail = null;
let dob = null;
let initialPromptSent = false;

const devTracker2 = async (req, res) => {
  try {
    // Check if userEmail and dob are not set
    if (!userEmail && !dob) {
      // Set userEmail and dob from req.body
      userEmail = req.body.userEmail;
      dob = req.body.dob;

      // Fetch child data based on user's email and dob
      const connection = await checkConnection();
      const childrenData = await queryValues(
        connection,
        "SELECT * FROM childs_BioData WHERE userEmail = ? AND dob = ?",
        [userEmail, dob]
      );

      if (childrenData.length === 0) {
        // If no child data found, send an appropriate response
        return res
          .status(404)
          .send("No child found for the provided email and date of birth.");
      }

      // If there are multiple children, you need to choose one based on some criteria.
      // For simplicity, let's choose the first child.
      const child = childrenData[0];

      // Calculate child's age in weeks
      const childsDOB = new Date(child.dob);
      const currentDate = new Date();
      const ageDiff = currentDate.getTime() - childsDOB.getTime();
      const ageInWeeks = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 7));

      // Prepare the initial prompt
      const initialPrompt = `Say 'Hi' to me before responding and do not include "Certainly" before responding to my question.
      My child name is ${child.fullname}, child's gender is ${child.gender} and ${ageInWeeks} weeks old. Give me the development of my child's age?
      End your statement with "Remember that every child develops at their own pace.Do you have any other concerns about your child's development?`;

      console.log("Initial Prompt:", initialPrompt); // Log initial prompt

      // Send the initial prompt to OpenAI
      const openai = new OpenAI({ apiKey: process.env.API_KEY });
      const initialResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: initialPrompt }],
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const initialResponseData = initialResponse.choices[0].message.content;

      // Send the initial response to the user
      res.status(200).send(initialResponseData);

      // Set initialPromptSent to true
      initialPromptSent = true;
    } else {
      // For subsequent requests, use the user's message as the prompt to OpenAI
      const userMessage = req.body.userMessage;

      // Send prompt to OpenAI
      const openai = new OpenAI({ apiKey: process.env.API_KEY });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const responseData = response.choices[0].message.content;

      // Send response to user
      res.status(200).send(responseData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { devTracker2 };
