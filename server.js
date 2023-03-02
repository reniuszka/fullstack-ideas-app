const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
const app = express();

//middleware for public folder which is gonna be static folder with express so html is gonna be displayed in the browser http://localhost:5000/
//__dirname its a current directory where aI am and public folder make static -> when we run npm run build all files go to public folder and we are able to render the app and able to see the api: http://localhost:5000/api/ideas
app.use(express.static(path.join(__dirname, "public")));
// const port = 5000;

//Body parser middleware (parsing data in the body) used to use with the post method. it happens between the request and response
// parse application/json, basically parse incoming Request Object as a JSON Object. If you use express.json() it will parse the body from post/fetch request except from html post form. It wont parse information from the html post form :
app.use(express.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays.So the difference is express.json() is a body parser for post request except html post form and express.urlencoded({extended: false}) is a body parser for html post form.
app.use(express.urlencoded({ extended: false }));

//cors middleware to allow making request from port 3000(frontend), an array of urls that I allow to make requests from
// [webpack-dev-server] [HPM] Error occurred while proxying request localhost:3000/api/ideas to http://localhost:5000/
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);
// /req, res object
app.get("/", (req, res) => {
  // Content-Type: application/json; charset=utf-8 - no need to stringify it for both of them
  // res.json({ message: "Hello World!" });
  res.send({ message: "Hello To My Inspiration World!" });
  // text/html; charset=utf-8
  // res.send("Hello World!");
});
////a route to get a single idea using a query param
// app.get("/api/ideas/:id", (req, res) => {
//   // http:localhost:5000/ideas/55 - 55 is my re.params.id so need to find it in my api if exists and convert it to Number
//   // console.log(res.params.id, "it is a string so need to parse it");
//   const findIdea = ideas.find((idea) => idea.id === Number(req.params.id));
//   //need to return it if not the error: Cannot set headers after they are sent to the client
//   if (!findIdea) {
//     return res.status(404).json({
//       message: req.params.id,
//       success: false,
//       error: "Resource not found",
//     });
//   }
//   res.json({
//     message: "Hello To Ideas  id details!",
//     success: true,
//     data: findIdea,
//   });
// });
// app.get("/api/ideas", (req, res) => {
//   res.json({ message: "Hello To Ideas API!", success: true, data: ideas });
// });

const ideasRouter = require("./routes/ideas.js");
//used middleware to say that if i want to go to "/api/ideas" i want it to go to the ideasRouter = require("./routes/ideas.js");
app.use("/api/ideas", ideasRouter);
//create server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
