const { Router } = require("express");
const config = require("config");

const auth = require("../middleware/auth.middleware");

const Password = require("../models/Password");
const router = Router();

// GET Passwords API - api/pass/
router.get("/", auth, async (req, res) => {
  try {
    const sort = req.query.sort;
    const passwords = await Password.find({ owner: req.user.userId }).sort(
      `${sort}`
    );
    res.json(passwords);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

// CREATE Password API - api/pass/create
router.post("/create", auth, async (req, res) => {
  try {
    const password = new Password({ ...req.body, owner: req.user.userId });
    await password.save();

    res.status(201).json({ password });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please try again" });
  }
});

// EDIT Password API - api/pass/edit/:id
router.put("/edit/:id", auth, async (req, res) => {
  const updateObj = { ...req.body, date_modified: Date.now() };
  await Password.findByIdAndUpdate(
    req.params.id,
    updateObj,
    { new: true },
    (err, model) => {
      if (err)
        res
          .status(500)
          .json({ message: "Something went wrong. Please try again" });
      res.json(model);
    }
  );
});

// DELETE Password API - api/pass/delete/:id
router.delete("/delete/:id", auth, async (req, res) => {
  await Password.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err)
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again" });
    res.json({ message: "Password was removed successfully" });
  });
});

module.exports = router;
