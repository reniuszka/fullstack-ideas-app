const express = require("express");
const router = express.Router();

const Idea = require("../models/Idea");
// const ideas = [
//   {
//     id: 1,
//     text: "Education is not the learning of the facts, but the training of the mind to think",
//     tag: "Education",
//     username: "Albert Einstein",
//     date: "02-09-1921",
//   },
//   {
//     id: 2,
//     text: "Anyone who has never made a mistake has never tried anything new.",
//     tag: "Life",
//     username: "Albert Einstein",
//     date: "02-09-1901",
//   },
//   {
//     id: 3,
//     text: "It’s not that I’m so smart. It’s just that I stay with problems longer.",
//     tag: "Life",
//     username: "Albert Einstein",
//     date: "02-09-1941",
//   },
//   {
//     id: 4,
//     text: "If you can't explain it simply, you don't understand it well enough",
//     tag: "Education",
//     username: "Albert Einstein",
//     date: "02-09-1935",
//   },
// ];

// middleware that is specific to this router, we use ''use' with middleware
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
// router.get("/", (req, res) => {
//   res.send("Birds home page");
// });
// define the about route
// router.get("/about", (req, res) => {
//   res.send("About birds");
// });

// router.get("/:id", (req, res) => {
// app.get("/api/ideas/:id", (req, res) => {
// http:localhost:5000/ideas/55 - 55 is my re.params.id so need to find it in my api if exists and convert it to Number
// console.log(res.params.id, "it is a string so need to parse it");
// const findIdea = ideas.find((idea) => idea.id === Number(req.params.id));
// //need to return it if not the error: Cannot set headers after they are sent to the client
// if (!findIdea) {
//   return res.status(404).json({
//     message: req.params.id,
//     success: false,
//     error: "Resource not found",
//   });
// }
// res.json({
//   message: "Hello To Ideas  id details!",
//   success: true,
//   data: findIdea,
// });

// :id => req.params.id
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({
      message: "Hello To Idea id details!",
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error, "error");
    res
      .status(500)
      .json({ message: "error", success: false, error: "sth went wrong" });
  }
});

// router.get("/", (req, res) => {
router.get("/", async (req, res) => {
  //instead /api/ideas =? / as the file will be connected with serve.js
  // app.get("/api/ideas", (req, res) => {
  // res.json({ message: "Hello To Ideas API!", success: true, data: ideas });
  //!!!  when we use our model it return the promise - it gets our ideas. method from mongoose is called find() will get our all ideas
  try {
    const ideas = await Idea.find();
    res.json({ message: "Hello To Ideas API!", success: true, data: ideas });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      message: "no data - ERROR",
      success: false,
      error: "Something went wrong",
    });
  }
});

//add an idea to the ideas (postaman, dodaj w body i urlencoded - body to jest to co wysylam wiec jak dodam obikt to mam dostepne key jak text czy username)
router.post("/", async (req, res) => {
  // router.post("/", (req, res) => {
  // const idea = {
  //   id: ideas.length + 1,
  //   text: req.body.text,
  //   tag: req.body.tag,
  //   username: req.body.username,
  //   data: new Date().toISOString().slice(0, 10),
  // };

  // ideas.push(idea);
  // res.json({ success: true, data: idea });
  //new item (new instance from Idea Object)
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  //using save method
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({
      message: "no data - ERROR",
      success: false,
      error: "sth went wrong",
    });
  }
});

//update idea
// router.put("/:id", (req, res) => {
//   const findIdea = ideas.find((idea) => idea.id === Number(req.params.id));

//   if (!findIdea) {
//     return res.status(404).json({
//       message: req.params.id,
//       success: false,
//       error: "Resource not found",
//     });
//   }
//   //assign the new value from the body or leave the old one
//   findIdea.text = req.body.text || findIdea.text;
//   findIdea.tag = req.body.tag || findIdea.tag;

//   //return updated are
//   res.json({
//     message: "updated idea",
//     success: true,
//     data: findIdea,
//   });
// });
router.put("/:id", async (req, res) => {
  //find this id and we can set new values to text and tag, third argument is new to true (if that id doest not exist it will create a new one)
  try {
    //get the idea that we want to update and validate the user name of it
    const idea = await Idea.findById(req.params.id);

    //if match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({
        message: "updated idea",
        success: true,
        data: updatedIdea,
      });
    }
    //usernames not matched:
    console.log(error, "err 403");
    res.status(403).json({
      message: "403 - ERROR",
      success: false,
      error: "you are not allowed to update this resource",
    });
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({
      message: "no data - ERROR",
      success: false,
      error: "sth went wrong",
    });
  }
});

//delete idea
// router.delete("/:id", (req, res) => {
//   const findIdea = ideas.find((idea) => idea.id === Number(req.params.id));
//   if (!findIdea) {
//     return res.status(404).json({
//       message: req.params.id,
//       success: false,
//       error: "Resource not found",
//     });
//   }
//   //find index of this id in the array
//   const indexToDelete = ideas.indexOf(findIdea);
//   ideas.splice(indexToDelete, 1);

//   //return updated are
//   res.json({
//     message: "deleted idea",
//     success: true,
//     data: {},
//   });
// });
router.delete("/:id", async (req, res) => {
  try {
    //get the idea that we want to delete and validate the user name of it
    const idea = await Idea.findById(req.params.id);

    //if match the usernames
    if (idea.username === req.body.username) {
      const deleteIdea = await Idea.findByIdAndDelete(req.params.id);
      //if we add return then no need to add else {}
      return res.json({
        message: "deleted idea",
        success: true,
        data: deleteIdea,
      });
    }
    //usernames do not match => 403 unauthorize
    res.status(403).json({
      message: "no data - ERROR",
      success: false,
      error: "you are not alllowed to delete this resource",
    });
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({
      message: "no data - ERROR",
      success: false,
      error: "sth went wrong",
    });
  }
});
// {
//     "success": true,
//     "data": {
//         "id": 5,
//         "text": "bla bla",
//         "tag": "inspiration",
//         "username": "me",
//         "data": 25
//     }
// }

module.exports = router;
