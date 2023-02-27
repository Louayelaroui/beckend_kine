const {
  addComment,
  addPlayerInjury,
  getAllInjuries,
  getPlayerInjuries,
  getInjuryById,
  deleteInjury,
} = require("../controllers/injurie.controller");
const {
  isAuthHeaders,
  checkUserPlayerOwnership,
} = require("../middleware/isAuth.middleware");

const router = require("express").Router();

router.post(
  "/add-comment/:playerId/:injuryId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  addComment
);
router.post(
  "/:playerId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  addPlayerInjury
);
router.get(
  "/:playerId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  getAllInjuries
);
router.post(
  "/player/:playerId",
  isAuthHeaders,
  checkUserPlayerOwnership,
  getPlayerInjuries
);
router.get("/:id", isAuthHeaders, getInjuryById);
router.delete("/:id", isAuthHeaders, deleteInjury);

module.exports = router;
