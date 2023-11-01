const Employee = require("../../models/employee");
const Roles = require("../../models/roles");
const { States, Town_City, Area } = require("../../models/placeDirectory");
const { Inventory_type, Inventory } = require("../../models/inventory");
const {
  employeeSchema,
  roleSchema,
  stateSchema,
  town_city_Schema,
  areaSchema,
  inventory_types_schema,
  inventorySchema,
} = require("../validation/schema");

exports.getEmployee = async (req, res, next) => {
  try {
    const data = await Employee.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.employeeCreation = async (req, res, next) => {
  try {
    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Employee.create(value);

    res.status(200).json({
      message: "User Created successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.Updateemployee = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is missing" });
    }

    const { error, value } = employeeSchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }

    Employee.update(value, {
      where: { employee_id: id },
    })
      .then((resp) => {
        if (resp[0] == 0) {
          return res.status(400).json({ error: "no user found !!!" });
        }
        res.status(201).json({
          Message: "Updata successful !!!",
        });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await Employee.destroy({ where: { employee_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find user" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};

exports.createRoles = async (req, res, next) => {
  try {
    const { error, value } = roleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Roles.create(value);
    res.status(201).json({
      message: "Role created successfully !!!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteRoles = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }

    const data = await Roles.destroy({ where: { role_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find the Role" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
exports.getRoles = async (req, res, next) => {
  try {
    const data = await Roles.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.editRoles = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is missing" });
    }

    const { error, value } = roleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Roles.update(value, { where: { role_id: id } });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};

exports.create_state = async (req, res, next) => {
  try {
    const { error, value } = stateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await States.create(value);
    res.status(201).json({
      message: "Created successfully !!!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.edit_state = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Id is missing in params !!!" });
    }

    const { error, value } = stateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await States.update(value, {
      where: {
        state_id: id,
      },
    });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteState = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await States.destroy({ where: { state_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find State" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
exports.get_states = async (req, res, next) => {
  try {
    const data = await States.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.towns_creation = async (req, res, next) => {
  try {
    const { error, value } = town_city_Schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Town_City.create(value);
    res.status(201).json({ message: "successful", data });
  } catch (error) {
    next(error);
  }
};

exports.update_town = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Id is missing in params !!!" });
    }

    const { error, value } = town_city_Schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Town_City.update(value, {
      where: {
        town_city_id: id,
      },
    });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteTown = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await Town_City.destroy({ where: { town_city_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find Town" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};

exports.get_towns = async (req, res, next) => {
  try {
    const data = await Town_City.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.create_area = async (req, res, next) => {
  try {
    const { error, value } = areaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Area.create(value);
    res.status(201).json({ message: "successful", data });
  } catch (error) {
    next(error);
  }
};

exports.update_area = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Id is missing in params !!!" });
    }

    const { error, value } = areaSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Area.update(value, {
      where: {
        area_id: id,
      },
    });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteArea = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await Area.destroy({ where: { area_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find Area" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
exports.get_area = async (req, res, next) => {
  try {
    const data = await Area.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.create_Inventory_type = async (req, res, next) => {
  try {
    const { error, value } = inventory_types_schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Inventory_type.create(value);
    res.status(201).json({ message: "successful", data });
  } catch (error) {
    next(error);
  }
};

exports.update_Inventory_type = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Id is missing in params !!!" });
    }

    const { error, value } = inventory_types_schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Inventory_type.update(value, {
      where: {
        id,
      },
    });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};

exports.delete_inventory_type = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await Inventory_type.destroy({ where: { id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find in DataBase" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};

exports.get_Inventory_type = async (req, res, next) => {
  try {
    const data = await Inventory_type.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.create_Inventory = async (req, res, next) => {
  try {
    const { error, value } = inventorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Inventory.create(value);
    res.status(201).json({ message: "successful", data });
  } catch (error) {
    next(error);
  }
};

exports.update_Inventory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Id is missing in params !!!" });
    }

    const { error, value } = inventorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Inventory.update(value, {
      where: {
        id,
      },
    });
    if (data[0] == 0) {
      return res.status(400).json({ error: "no user found !!!" });
    }
    res.status(201).json({
      Message: "Updata successful !!!",
    });
  } catch (error) {
    next(error);
  }
};
exports.delete_inventoey = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }
    const data = await Inventory.destroy({ where: { id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find Inventory" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
exports.get_Inventory = async (req, res, next) => {
  try {
    const data = await Inventory.findAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
