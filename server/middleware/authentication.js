exports.authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["auth"];
    if (!authHeader) {
      return res.status(400).json({ error: "Missing authentication header" });
    }

    if (authHeader !== process.env.AUTH_KEY) {
      return res.status(400).json({ error: "Invalid Authorization Token" });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
