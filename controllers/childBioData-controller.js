console.log("child date")
const dob = new Date("1994-01-15")
const date = new Date()
console.log(date.getFullYear() - dob.getFullYear())

/*
function name
enter your child's name = req.body
enter your childs DOB = req.body
enter childs gender = req.body
save this info in the db
send a prompt to the chatgpt  with this information to tell chatgpt
send the response of chatgpt back to the user,then with a following messag,  is there anything you want me to help you with?
formulate how to manipulate this message to send to chatgpt in a human manner
*/

