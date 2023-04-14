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

exports.edit = async function (req, res) {
  const data = await cars.findByPk(req.params.id);
  const carDetail = data.dataValues;

  res.render("car/edit", {
    carDetail,
  });
};

exports.update = function (req, res) {
  const { name, costPerDay, size } = req.body;
  const id = req.params.id;

  cars.update(
    {
      name,
      costPerDay,
      size,
    },
    {
      where: {
        id,
      },
    }
  );

  res.redirect(202, "/cars-list");
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
