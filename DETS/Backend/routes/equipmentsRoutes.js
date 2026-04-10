const express = require("express");
const router = express.Router();

const equipmentModal = require("../models/equipmentModal");

router.get("/fetch/equipments", async (req, res) => {
  try {
    const equipments = await equipmentModal.fetchEquipments();
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ message: "Error While Fetching Equipments." });
  }
});

router.post("/equipment", async (req, res) => {
  try {
    const add = await equipmentModal.createEquipment(req.body);
    res.status(201).json({ message: "Equipment added in the Stock." });
    console.log("Query Okay.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding equipment" });
  }
});

router.delete("/equipment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const _delete = await equipmentModal.deleteEquipment(id);
    res.status(200).json({ message: "Equipment deleted." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting equipment." });
  }
});

router.put("/equipment/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await equipmentModal.updateEquipment({ ...req.body, id });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error("Error while updating product:", error);
    res.status(500).json({ message: "Error while updating equipment" });
  }
});


module.exports = router;
