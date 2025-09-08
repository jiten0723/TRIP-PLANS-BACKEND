import { Router } from "express";
import {
  create,
  findAll,
  findById,
  update,
  remove,
} from "../services/packageList.js";
import { createPackageList } from "../validators/packageList.js";
import { useValidator } from "../middlewares/useValidator.js";

const router = Router();
// Get all package lists (for cases when tripId is not provided)
router.get("/", async (req, res) => {
  try {
    const lists = await findAll();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch package lists" });
  }
});

router.post("/:tripId", useValidator(createPackageList), create);
router.get("/:tripId", findAll);
router.get("/:tripId/:id", findById);
router.patch("/:tripId/:id", update);
router.delete("/:tripId/:id", remove);

export default router;
