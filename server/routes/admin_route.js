const express = require("express");
const routes = express.Router();
const { authentication } = require("../middleware/authentication");
const {
  getEmployee,
  employeeCreation,
  Updateemployee,
  createRoles,
  getRoles,
  editRoles,
  create_state,
  edit_state,
  get_states,
  towns_creation,
  update_town,
  get_towns,
  create_area,
  update_area,
  get_area,
  create_Inventory,
  create_Inventory_type,
  update_Inventory,
  update_Inventory_type,
  get_Inventory,
  get_Inventory_type,
} = require("../controller/admin_controller");

routes.get("/employee", authentication, getEmployee);
routes.post("/employee", authentication, employeeCreation);
routes.patch("/employee/:id", authentication, Updateemployee);

routes.post("/roles", authentication, createRoles);

routes.get("/roles", authentication, getRoles);
routes.patch("/roles/:id", authentication, editRoles);
routes.get("/state", authentication, get_states);
routes.post("/state", authentication, create_state);
routes.patch("/state/:id", authentication, edit_state);
routes.post("/town", authentication, towns_creation);
routes.patch("/town/:id", authentication, update_town);
routes.get("/town", authentication, get_towns);
routes.post("/area", authentication, create_area);
routes.patch("/area/:id", authentication, update_area);
routes.get("/area", authentication, get_area);

routes.post("/inventory-type", authentication, create_Inventory_type);
routes.patch("/inventory-type/:id", authentication, update_Inventory_type);
routes.get("/inventory-type", authentication, get_Inventory_type);
routes.post("/inventory", authentication, create_Inventory);
routes.patch("/inventory/:id", authentication, update_Inventory);
routes.get("/inventory", authentication, get_Inventory);

module.exports = routes;
