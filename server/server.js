// import dependencies
const express = require("express");
const morgan = require("morgan");
const TodoRouter = require("./routes/todo")
// create express app
const app = express();

//  middleware 
app.use(morgan('dev'));
app.use(express.json());
// routing
app.use("/api",TodoRouter)
// start server
app.listen(5000, () => {
  console.log("server listening on port 5000");
});
