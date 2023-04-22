var express = require("express");
var router = express.Router();

// const QueryController = require("../controller/QueryController");
const AuthController = require("../controller/AuthController");

// router.get("/", QueryController.listCategories);
router.post("/", AuthController.checkLogin);
// router.get("/user-types", QueryController.getUserTypes);
// router.get("/types", QueryController.getTypes);
// router.post("/", QueryController.createApplication);
// router.get("/", QueryController.applicationList);
// router.get("/:id", QueryController.applicationDetail);
// router.put("/:id", QueryController.applicationUpdate);
// router.delete("/:id", QueryController.applicationDelete);
// router.patch("/:id", QueryController.updateApplicationStatus);

// router.get("/:id/export", QueryController.exportApplication);

module.exports = router;