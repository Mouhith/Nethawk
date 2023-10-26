const Leads = require("../../models/leads");
const { leadSchema } = require("../validation/schema");

exports.leadCreation = async (req, res) => {
  try {
    // Retrieve the "Auth" header value from the request
    const authHeader = req.headers["auth"];

    // Validate the "Auth" header
    if (!authHeader) {
      return res.status(400).json({ error: "Missing authentication header" });
    }

    if (authHeader !== process.env.AUTH_KEY) {
      return res.status(400).json({ error: "Invalid Authorization Token" });
    }

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
  } catch (err) {
    // Handle any unexpected errors
    console.error(err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Duplicate data - lead already exists" });
    }

    // For other database-related errors
    res.status(500).json({ error: "Internal server error" });
  }
};
