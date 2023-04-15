const express = require("express");
const path = require("path");
const carsController = require("./controllers/carsController");
const upload = require("./middleware/uploader");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.get("/cars-list", carsController.list);
app.get("/cars-create", carsController.create);
app.post("/cars-store", upload.single("img"), carsController.store);
app.get("/cars-edit-:id", carsController.edit);
app.post("/cars-update-:id", upload.single("img"), carsController.update);
app.post("/cars-delete-:id", carsController.delete);

// listen PORT
app.listen(PORT, () => {
  console.log(
    `Server sudah berjalan, silahkan buka http://localhost:${PORT}/cars-list`
  );
});
