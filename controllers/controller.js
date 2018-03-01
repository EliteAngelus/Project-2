// var express = require("express");

// var router = express.Router();

// // Import the model (users.js) to use its database functions.
// var Users = require("../models/users.js");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   Users.all(function(data) {
//     var hbsObject = {
//       Users: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/Users", function(req, res) {
//   user.create(["name", "language", "level"], [req.body.name, req.body.language, req.body.level], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/userTable/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);
// //I AM UNSURE ABOUT WHT CONDITION DOES HERE, IT WAS IN THE MVC EXAMPLE AND I ALSO USED IT FOR MY HW
//   user.update(
//     {
//       language: req.body.language
//     },
//     //wondering if we should add: {level:req.body.level},  too?
    
//     condition,
//     function(result) {
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       res.status(200).end();

//     }
//   );
// });

// // Export routes for server.js to use.
// module.exports = router;