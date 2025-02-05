import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const smoothieJSON =
  '[{"id":"0001","type":"fruit","name":"Berry Blast","price":4.99,"ingredients":{"base":{"name":"Yogurt","quantity":"1 cup"},"fruits":[{"name":"Strawberries","quantity":"1/2 cup"},{"name":"Blueberries","quantity":"1/2 cup"},{"name":"Banana","quantity":"1"}],"additional":[{"name":"Honey","quantity":"1 tablespoon"},{"name":"Chia Seeds","quantity":"1 teaspoon"}]}},{"id":"0002","type":"green","name":"Green Detox","price":5.99,"ingredients":{"base":{"name":"Almond Milk","quantity":"1 cup"},"fruits":[{"name":"Apple","quantity":"1"},{"name":"Banana","quantity":"1"}],"greens":[{"name":"Spinach","quantity":"1 cup"},{"name":"Kale","quantity":"1/2 cup"}],"additional":[{"name":"Lemon Juice","quantity":"1 tablespoon"},{"name":"Ginger","quantity":"1 teaspoon"}]}},{"id":"0003","type":"protein","name":"Protein Power","price":6.99,"ingredients":{"base":{"name":"Milk","quantity":"1 cup"},"fruits":[{"name":"Banana","quantity":"1"}],"protein":{"name":"Protein Powder","quantity":"1 scoop"},"additional":[{"name":"Peanut Butter","quantity":"2 tablespoons"},{"name":"Oats","quantity":"1/4 cup"}]}}]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

app.get("/", (req, res) => {
  res.render("index.ejs", { smoothie: data });
});

app.post("/smoothie", (req, res) => {
  const smoothies = JSON.parse(smoothieJSON);
  switch (req.body.choice) {
    case "fruit":
      data = smoothies[0];
      break;
    case "green":
      data = smoothies[1];
      break;
    case "protein":
      data = smoothies[2];
      break;
    default:
      data = null;
      break;
  }
  console.log(`Selected smoothie: ${JSON.stringify(data)}`); // Debugging line
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
