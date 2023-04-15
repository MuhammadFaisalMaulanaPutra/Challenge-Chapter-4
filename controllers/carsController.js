const { cars } = require("../models");
const { Op } = require("sequelize");
const imagekit = require("../lib/imagekit");
const upload = require("../middleware/uploader");

exports.list = async function (req, res) {
  let car;
  let active;
  if (req.query.size) {
    car = await cars.findAll({
      where: {
        size: req.query.size,
      },
    });
    active = req.query.size;
  } else {
    car = await cars.findAll();
    active = "all";
  }

  res.render("car/index", {
    car,
    active,
  });
};

exports.create = function (req, res, next) {
  res.render("car/create");
};

exports.store = async function (req, res, next) {
  const { name, costPerDay, size } = req.body;
  const file = req.file;

  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${ext}`,
  });

  await cars.create({
    name,
    costPerDay,
    size,
    image: img.url,
    idImage: img.fileId,
  });
  res.redirect(201, "/cars-list");
};

exports.edit = async function (req, res) {
  const data = await cars.findByPk(req.params.id);
  const carDetail = data.dataValues;

  res.render("car/edit", {
    carDetail,
  });
};

exports.update = async function (req, res) {
  const { name, costPerDay, size } = req.body;
  const file = req.file;
  const id = req.params.id;

  const car = await cars.findByPk(id);

  imagekit.deleteFile(car.dataValues.idImage, function (error, result) {
    if (error) console.log(error);
    else console.log(result);
  });

  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${ext}`,
  });

  cars.update(
    {
      name,
      costPerDay,
      size,
      image: img.url,
      idImage: img.fileId,
    },
    {
      where: {
        id,
      },
    }
  );

  res.redirect(202, "/cars-list");
};

exports.delete = async function (req, res) {
  const id = req.params.id;

  const car = await cars.findByPk(id);

  imagekit.deleteFile(car.dataValues.idImage, function (error, result) {
    if (error) console.log(error);
    else console.log(result);
  });

  cars.destroy({
    where: {
      id,
    },
  });

  res.redirect(200, "/cars-list");
};
