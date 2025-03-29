import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

//donot forget to declear the variable outside the middleware
// so that it can be used in the post method
var name = "";

app.use(bodyParser.urlencoded({ extended: true }));

//custom middlewaree
function contentType(req, res, next) {
  console.log(req.body);
  name = req.body["street"] + req.body["pet"];
  next();
}

app.use(contentType);

//get method
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//post method
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(
    `<h1>Street N Pet</h1> <br> <h2>${name} ❤️<h2> <br> <h3>Love to See u !!!</h3>` 
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



