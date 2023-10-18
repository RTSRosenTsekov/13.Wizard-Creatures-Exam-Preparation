const router = require("express").Router();
const homeController = require("./controllers/homeController");
// TO DO add endpoints with controllers here...

router.use(homeController);
module.exports = router;