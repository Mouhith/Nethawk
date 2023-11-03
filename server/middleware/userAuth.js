exports.userAuth = async (req, res, next) => {
  try {
    const cookiee = req.cookies["NU-NLIC"];

    if (!cookiee) {
      return res.status(200).redirect("/login");
    }

    req.cookie = cookiee;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
