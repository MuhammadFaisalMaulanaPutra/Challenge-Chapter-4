const { cars } = require("../models");
const { Op } = require("sequelize");

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

exports.create = function (req, res) {
  res.render("car/create");
};

exports.store = function (req, res) {
  const { name, costPerDay, size } = req.body;

  cars.create({
    name,
    costPerDay,
    size,
  });
  res.redirect(201, "/cars-list");
};

exports.edit = function (req, res) {
  res.render("car/edit");
};

exports.delete = function (req, res) {
  const id = req.params.id;
  cars.destroy({
    where: {
      id,
    },
  });

  res.redirect(200, "/cars-list");
};
