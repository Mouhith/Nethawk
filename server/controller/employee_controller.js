const Leads = require("../../models/leads");
const Schedule = require("../../models/schedule");
const { leadSchema, scheduleSchema } = require("../validation/schema");
const regSchedule = require("../tools/scheduler");
const nPerf = require("../tools/results");
exports.leadCreation = async (req, res, next) => {
  try {
    // Validate the request body with Joi
    const { error, value } = leadSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create the lead
    const response = await Leads.create(value);

    // Send a successful response
    res
      .status(200)
      .json({ message: "Lead created successfully", data: response });
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is a required field !!" });
    }
    // Validate the request body with Joi
    const { error, value } = leadSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create the lead
    const data = await Leads.update(value, {
      where: { lead_id: id },
    });

    // Send a successful response
    if (data[0] == 0) {
      return res.status(400).json({ error: "Invalid ID !!" });
    }
    res.status(201).json({ message: "successfully Updated !!", data });
  } catch (error) {
    next(error);
  }
};
exports.deleteLeads = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }

    const data = await Leads.destroy({ where: { lead_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find the Lead" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};
exports.getLeads = async (req, res, next) => {
  try {
    const data = await Leads.findAll();

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.scheduleCreation = async (req, res, next) => {
  try {
    const { error, value } = scheduleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const data = await Schedule.create(value);
    regSchedule(data.Booking_datetime_to, "test");
    res.status(201).json({ message: "success !!", data });
  } catch (error) {
    next(error);
  }
};

exports.scheduleUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is a required field !!" });
    }

    const { error, value } = scheduleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = await Schedule.update(value, {
      where: {
        Schedule_id: id,
      },
    });

    if (data[0] == 0) {
      return res.status(400).json({ error: "Invalid ID !!" });
    }
    res.status(201).json({ message: "successfully Updated !!", data });
  } catch (error) {
    next(error);
  }
};

exports.getschedule = async (req, res, next) => {
  try {
    const data = await Schedule.findAll();

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
exports.deleteSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ error: "Id is required" });
    }

    const data = await Schedule.destroy({ where: { Schedule_id: id } });
    if (data === 0) {
      return res.status(400).json({ error: "can not find the Schedule" });
    }
    res.status(200).json({ message: "delete" });
  } catch (error) {
    next(error);
  }
};

exports.nperf = async (req, res, next) => {
  try {
    const resp = await nPerf();
    res.status(200).json({ resp });
  } catch (error) {
    next(error);
  }
};
